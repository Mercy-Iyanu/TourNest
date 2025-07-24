import React from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Stack,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
} from "@mui/material";
import { useFormikContext, FieldArray } from "formik";

const AvailabilitySection = () => {
  const { values, handleChange } = useFormikContext();

  return (
    <>
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
    </>
  );
};

export default AvailabilitySection;
