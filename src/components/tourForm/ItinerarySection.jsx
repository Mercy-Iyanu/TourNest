import React from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { useFormikContext, FieldArray } from "formik";

const ItinerarySection = () => {
  const { values, handleChange } = useFormikContext();

  return (
    <>
      <Typography variant="h6" mt={4}>
        Itinerary
      </Typography>
      <FieldArray name="itinerary">
        {({ push, remove }) => (
          <>
            {values.itinerary.map((item, index) => (
              <Grid container spacing={2} key={index}>
                {["day", "title", "description", "location"].map((field) => (
                  <Grid item xs={12} sm={6} key={field}>
                    <TextField
                      fullWidth
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      name={`itinerary[${index}].${field}`}
                      value={values.itinerary[index][field]}
                      onChange={handleChange}
                    />
                  </Grid>
                ))}
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
    </>
  );
};

export default ItinerarySection;
