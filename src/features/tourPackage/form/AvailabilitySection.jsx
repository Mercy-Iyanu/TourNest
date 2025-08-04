import React from "react";
import {
  Box,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Button,
} from "@mui/material";
import { FieldArray, useFormikContext } from "formik";

const AvailabilitySection = () => {
  const { values, handleChange } = useFormikContext();

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6" gutterBottom>
        Availability
      </Typography>

      <FieldArray name="availability">
        {({ push, remove }) => (
          <>
            {values.availability.map((item, index) => (
              <Box
                gap={2}
                p={2}
                key={index}
                border={1}
                borderColor="grey.300"
                borderRadius={2}
                display="flex"
                flexDirection="column"
                sx={{ borderBottom: "1px solid #ddd", mb: 2, pb: 2 }}
              >
                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  name={`availability[${index}].startDate`}
                  value={item.startDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  fullWidth
                  label="End Date"
                  type="date"
                  name={`availability[${index}].endDate`}
                  value={item.endDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  fullWidth
                  label="Min Guests"
                  type="number"
                  name={`availability[${index}].minGuests`}
                  value={item.minGuests}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="Max Guests"
                  type="number"
                  name={`availability[${index}].maxGuests`}
                  value={item.maxGuests}
                  onChange={handleChange}
                />

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
                <Box>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => remove(index)}
                  >
                    Remove Availability
                  </Button>
                </Box>
              </Box>
            ))}

            <Button
              variant="outlined"
              color="primary"
              onClick={() =>
                push({
                  startDate: "",
                  endDate: "",
                  minGuests: "",
                  maxGuests: "",
                  isAvailable: true,
                })
              }
              sx={{ mt: 2 }}
            >
              Add Availability
            </Button>
          </>
        )}
      </FieldArray>
    </Box>
  );
};

export default AvailabilitySection;
