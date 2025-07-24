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
  const { values, handleChange } = useFormikContext();

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
                      <MenuItem value="international">International</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Min Group Size"
                    name="booking.minGroupSize"
                    type="number"
                    value={values.booking.minGroupSize}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Max Group Size"
                    name="booking.maxGroupSize"
                    type="number"
                    value={values.booking.maxGroupSize}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Cancellation Policy"
                    name="booking.cancellationPolicy"
                    value={values.booking.cancellationPolicy}
                    onChange={handleChange}
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
