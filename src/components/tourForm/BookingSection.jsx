import React from "react";
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
} from "@mui/material";
import { FieldArray, useFormikContext } from "formik";

const BookingSection = () => {
  const { values, handleChange, touched, errors } = useFormikContext();

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
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
                    label="Name"
                    name={`booking.paymentMethods[${index}].name`}
                    value={pm.name}
                    onChange={handleChange}
                    error={
                      touched.booking?.paymentMethods?.[index]?.name &&
                      Boolean(errors.booking?.paymentMethods?.[index]?.name)
                    }
                    helperText={
                      touched.booking?.paymentMethods?.[index]?.name &&
                      errors.booking?.paymentMethods?.[index]?.name
                    }
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
                      error={
                        touched.booking?.paymentMethods?.[index]?.type &&
                        Boolean(errors.booking?.paymentMethods?.[index]?.type)
                      }
                    >
                      <MenuItem value="local">Local</MenuItem>
                      <MenuItem value="international">International</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Cancellation Policy"
                    name="booking.cancellationPolicy"
                    value={values.booking.cancellationPolicy}
                    onChange={handleChange}
                    error={
                      touched.booking?.cancellationPolicy &&
                      Boolean(errors.booking?.cancellationPolicy)
                    }
                    helperText={
                      touched.booking?.cancellationPolicy &&
                      errors.booking?.cancellationPolicy
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={1}>
                  <Button
                    color="error"
                    onClick={() => remove(index)}
                    aria-label={`Remove payment method ${index + 1}`}
                  >
                    Remove
                  </Button>
                </Grid>
              </Grid>
            ))}

            <Box>
              <Button
                variant="outlined"
                onClick={() => push({ id: "", name: "", type: "local" })}
              >
                Add Payment Method
              </Button>
            </Box>
          </Stack>
        )}
      </FieldArray>
    </Box>
  );
};

export default BookingSection;
