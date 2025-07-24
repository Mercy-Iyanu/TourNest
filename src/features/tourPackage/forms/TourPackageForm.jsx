import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Stack,
  MenuItem,
  Box,
  InputLabel,
  Select,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { uploadMedia } from "../services/uploadService";
import axios from "../services/api";
import { toast } from "react-toastify";

const initialValues = {
  basicInfo: {
    tour_name: "",
    description: "",
    tour_type: "",
    country: "",
    state: "",
    city: "",
    duration: "",
  },
  itinerary: [
    {
      day: "",
      title: "",
      description: "",
      location: "",
      startTime: "",
      endTime: "",
    },
  ],
  pricing: {
    pricePerPerson: "",
    currency: "",
    discount: {
      discountType: "",
      discountValue: "",
      minGroupSize: "",
      startDate: "",
      endDate: "",
    },
    availability: [],
  },
  booking: {
    cancellationPolicy: "",
    paymentMethods: [],
    minGroupSize: "",
    maxGroupSize: "",
  },
  media: {
    tourImages: [],
    tourVideos: [],
    additionalFiles: [],
  },
  additional: {
    requirements: "",
    contact: {
      name: "",
      phone: "",
      email: "",
    },
    tags: [],
  },
};

const validationSchema = Yup.object().shape({
  basicInfo: Yup.object().shape({
    tour_name: Yup.string().required("Tour name is required"),
    description: Yup.string(),
    country: Yup.string(),
    state: Yup.string(),
    city: Yup.string(),
    duration: Yup.string(),
    tour_type: Yup.string(),
  }),

  itinerary: Yup.array().of(
    Yup.object().shape({
      day: Yup.string(),
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      startTime: Yup.string(),
      endTime: Yup.string(),
    })
  ),

  pricing: Yup.object().shape({
    pricePerPerson: Yup.number().typeError("Price must be a number"),
    currency: Yup.string(),
    discount: Yup.object().shape({
      discountType: Yup.string().oneOf(["percentage", "fixed"]).nullable(),
      discountValue: Yup.number().nullable(),
      minGroupSize: Yup.number().nullable(),
      startDate: Yup.date().nullable(),
      endDate: Yup.date()
        .nullable()
        .min(Yup.ref("startDate"), "End date must be after start date"),
    }),
    availability: Yup.array().of(
      Yup.object().shape({
        start_date: Yup.string(),
        end_date: Yup.string(),
        max_guests: Yup.number().typeError("Max guests must be a number"),
        is_available: Yup.boolean(),
      })
    ),
  }),

  booking: Yup.object().shape({
    cancellationPolicy: Yup.string(),
    paymentMethods: Yup.array().of(
      Yup.object().shape({
        id: Yup.number()
          .typeError("ID must be a number")
          .required("ID is required"),
        name: Yup.string().required("Name is required"),
        type: Yup.string()
          .oneOf(["local", "international"])
          .required("Payment type is required"),
      })
    ),
    minGroupSize: Yup.number().typeError("Min group size must be a number"),
    maxGroupSize: Yup.number().typeError("Max group size must be a number"),
  }),

  additional: Yup.object().shape({
    requirements: Yup.string(),
    contact: Yup.object().shape({
      name: Yup.string(),
      phone: Yup.string().matches(
        /^[\d+()\s-]{7,20}$/,
        "Phone number is not valid"
      ),
      email: Yup.string().email("Invalid email"),
    }),
    tags: Yup.array().of(Yup.string()),
  }),

  media: Yup.object().shape({
    tourImages: Yup.array().of(Yup.string().url("Invalid image URL")),
    tourVideos: Yup.array().of(Yup.string().url("Invalid video URL")),
    additionalFiles: Yup.array().of(Yup.string().url("Invalid file URL")),
  }),
});

const TourPackageForm = () => {
  const [uploading, setUploading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formValues, setFormValues] = useState(null);

  const handleMediaUpload = async (event, field, setFieldValue) => {
    const files = event.currentTarget.files;
    setUploading(true);
    try {
      const urls = await uploadMedia(files);
      setFieldValue(field, urls);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    setFormValues(values);
    setConfirmOpen(true);
  };

  const handleConfirmSubmit = async () => {
    setConfirmOpen(false);
    try {
      toast.info("Submitting package...");

      const res = await axios.post("/api/packages", formValues);
      toast.success("Tour package created successfully!");
    } catch (err) {
      toast.error("Submission failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        handleChange,
        setFieldValue,
        errors,
        touched,
        resetForm,
      }) => (
        <>
          <Form>
            <Box sx={{ p: 3 }}>
              <Typography variant="h5" mb={2}>
                Create Tour Package
              </Typography>

              <Grid container spacing={2}>
                {[
                  "tour_name",
                  "description",
                  "country",
                  "state",
                  "city",
                  "duration",
                ].map((field) => (
                  <Grid item xs={12} sm={6} key={field}>
                    <TextField
                      fullWidth
                      label={field.replace("_", " ")}
                      name={`basicInfo.${field}`}
                      value={values.basicInfo[field]}
                      onChange={handleChange}
                      error={
                        touched.basicInfo?.[field] &&
                        Boolean(errors.basicInfo?.[field])
                      }
                      helperText={
                        touched.basicInfo?.[field] && errors.basicInfo?.[field]
                      }
                    />
                  </Grid>
                ))}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Tour Type</InputLabel>
                    <Select
                      name="basicInfo.tour_type"
                      value={values.basicInfo.tour_type}
                      onChange={handleChange}
                      error={
                        touched.basicInfo?.tour_type &&
                        Boolean(errors.basicInfo?.tour_type)
                      }
                    >
                      <MenuItem value="adventure">Adventure</MenuItem>
                      <MenuItem value="leisure">Leisure</MenuItem>
                      <MenuItem value="cultural">Cultural</MenuItem>
                      <MenuItem value="wildlife">Wildlife</MenuItem>
                    </Select>
                    {touched.basicInfo?.tour_type && (
                      <Typography variant="caption" color="error">
                        {errors.basicInfo?.tour_type}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
              </Grid>

              <Typography variant="h6" mt={4}>
                Itinerary
              </Typography>
              <FieldArray name="itinerary">
                {({ push, remove }) => (
                  <>
                    {values.itinerary.map((item, index) => (
                      <Grid container spacing={2} key={index}>
                        {["day", "title", "description", "location"].map(
                          (field) => (
                            <Grid item xs={12} sm={6} key={field}>
                              <TextField
                                fullWidth
                                label={
                                  field.charAt(0).toUpperCase() + field.slice(1)
                                }
                                name={`itinerary[${index}].${field}`}
                                value={values.itinerary[index][field]}
                                onChange={handleChange}
                              />
                            </Grid>
                          )
                        )}
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Start Time"
                            name={`itinerary[${index}].startTime`}
                            value={values.itinerary[index].startTime}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="End Time"
                            name={`itinerary[${index}].endTime`}
                            value={values.itinerary[index].endTime}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => remove(index)}
                          >
                            Remove Day
                          </Button>
                        </Grid>
                      </Grid>
                    ))}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        push({
                          day: "",
                          title: "",
                          description: "",
                          location: "",
                          startTime: "",
                          endTime: "",
                        })
                      }
                      sx={{ mt: 2 }}
                    >
                      Add Day
                    </Button>
                  </>
                )}
              </FieldArray>

              <Typography variant="h6" mt={4}>
                Media Uploads
              </Typography>
              <Stack spacing={2}>
                <Button variant="outlined" component="label">
                  Upload Tour Images
                  <input
                    hidden
                    multiple
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleMediaUpload(e, "media.tourImages", setFieldValue)
                    }
                  />
                </Button>
                <Button variant="outlined" component="label">
                  Upload Tour Videos
                  <input
                    hidden
                    multiple
                    type="file"
                    accept="video/*"
                    onChange={(e) =>
                      handleMediaUpload(e, "media.tourVideos", setFieldValue)
                    }
                  />
                </Button>
                <Button variant="outlined" component="label">
                  Upload Additional Files
                  <input
                    hidden
                    multiple
                    type="file"
                    accept=".pdf,.docx"
                    onChange={(e) =>
                      handleMediaUpload(
                        e,
                        "media.additionalFiles",
                        setFieldValue
                      )
                    }
                  />
                </Button>
              </Stack>

              <Typography variant="h6" mt={4}>
                Availability
              </Typography>
              <FieldArray name="pricing.availability">
                {({ push, remove }) => (
                  <Stack spacing={2}>
                    {values.pricing.availability.map((avail, index) => (
                      <Grid container spacing={2} key={index}>
                        <Grid item xs={12} sm={3}>
                          <TextField
                            fullWidth
                            type="date"
                            label="Start Date"
                            InputLabelProps={{ shrink: true }}
                            name={`pricing.availability[${index}].start_date`}
                            value={avail.start_date}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <TextField
                            fullWidth
                            type="date"
                            label="End Date"
                            InputLabelProps={{ shrink: true }}
                            name={`pricing.availability[${index}].end_date`}
                            value={avail.end_date}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <TextField
                            fullWidth
                            type="number"
                            label="Max Guests"
                            name={`pricing.availability[${index}].max_guests`}
                            value={avail.max_guests}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <FormControl fullWidth>
                            <InputLabel shrink>Available</InputLabel>
                            <Select
                              displayEmpty
                              name={`pricing.availability[${index}].is_available`}
                              value={avail.is_available}
                              onChange={handleChange}
                            >
                              <MenuItem value={true}>Yes</MenuItem>
                              <MenuItem value={false}>No</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={1}>
                          <Button color="error" onClick={() => remove(index)}>
                            Remove
                          </Button>
                        </Grid>
                      </Grid>
                    ))}
                    <Button
                      onClick={() =>
                        push({
                          start_date: "",
                          end_date: "",
                          max_guests: "",
                          is_available: true,
                        })
                      }
                    >
                      Add Availability
                    </Button>
                  </Stack>
                )}
              </FieldArray>

              <Typography variant="h6" mt={4}>
                Payment Methods
              </Typography>
              <FieldArray name="booking.paymentMethods">
                {({ push, remove }) => (
                  <Stack spacing={2}>
                    {values.booking.paymentMethods.map((pm, index) => (
                      <Grid container spacing={2} key={index}>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            label="ID"
                            name={`booking.paymentMethods[${index}].id`}
                            value={pm.id}
                            onChange={handleChange}
                            type="number"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            label="Name"
                            name={`booking.paymentMethods[${index}].name`}
                            value={pm.name}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <FormControl fullWidth>
                            <InputLabel shrink>Type</InputLabel>
                            <Select
                              displayEmpty
                              name={`booking.paymentMethods[${index}].type`}
                              value={pm.type}
                              onChange={handleChange}
                            >
                              <MenuItem value="local">Local</MenuItem>
                              <MenuItem value="international">
                                International
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={1}>
                          <Button color="error" onClick={() => remove(index)}>
                            Remove
                          </Button>
                        </Grid>
                      </Grid>
                    ))}
                    <Button
                      onClick={() => push({ id: "", name: "", type: "local" })}
                    >
                      Add Payment Method
                    </Button>
                  </Stack>
                )}
              </FieldArray>

              <Typography variant="h6" mt={4}>
                Tags
              </Typography>
              <FieldArray name="additional.tags">
                {({ push, remove }) => (
                  <Stack direction="column" spacing={2}>
                    {values.additional.tags.map((tag, index) => (
                      <Box
                        key={index}
                        display="flex"
                        gap={2}
                        alignItems="center"
                      >
                        <TextField
                          label={`Tag ${index + 1}`}
                          name={`additional.tags[${index}]`}
                          value={tag}
                          onChange={handleChange}
                        />
                        <Button color="error" onClick={() => remove(index)}>
                          Remove
                        </Button>
                      </Box>
                    ))}
                    <Button onClick={() => push("")}>Add Tag</Button>
                  </Stack>
                )}
              </FieldArray>

              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 4 }}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Submit Tour Package"}
              </Button>
            </Box>
          </Form>
          <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to submit this tour package? This action
                will save it to the database.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
              <Button variant="contained" onClick={handleConfirmSubmit}>
                Yes, Submit
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Formik>
  );
};

export default TourPackageForm;
