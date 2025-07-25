import React from "react";
import {
  Grid,
  TextField,
  IconButton,
  Typography,
  Switch,
  FormControlLabel,
  Button,
} from "@mui/material";
import { FieldArray, useFormikContext } from "formik";
import { AddCircleOutline, Delete } from "@mui/icons-material";

const AvailabilitySection = () => {
  const { values, handleChange } = useFormikContext();

  return (
    <FieldArray name="availability">
      {({ push, remove }) => (
        <>
          <Typography variant="h6" gutterBottom>
            Availability
          </Typography>

          {values.availability.map((item, index) => (
            <Grid
              container
              spacing={2}
              key={index}
              sx={{ borderBottom: "1px solid #ddd", mb: 2, pb: 2 }}
            >
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  name={`availability[${index}].startDate`}
                  value={item.startDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="End Date"
                  type="date"
                  name={`availability[${index}].endDate`}
                  value={item.endDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Min Guests"
                  type="number"
                  name={`availability[${index}].minGuests`}
                  value={item.minGuests}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Max Guests"
                  type="number"
                  name={`availability[${index}].maxGuests`}
                  value={item.maxGuests}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Switch
                      name={`availability[${index}].isAvailable`}
                      checked={item.isAvailable}
                      onChange={handleChange}
                    />
                  }
                  label="Is Available"
                />
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
        </>
      )}
    </FieldArray>
  );
};

export default AvailabilitySection;
