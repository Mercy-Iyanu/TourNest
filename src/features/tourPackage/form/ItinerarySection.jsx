import React from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useFormikContext, FieldArray } from "formik";

const ItinerarySection = () => {
  const { values, handleChange } = useFormikContext();

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6" gutterBottom>
        Itinerary
      </Typography>

      <FieldArray name="itinerary">
        {({ push, remove }) => (
          <>
            {values.itinerary.map((item, index) => (
              <Box
                key={index}
                p={2}
                border={1}
                borderColor="grey.300"
                borderRadius={2}
                display="flex"
                flexDirection="column"
                gap={2}
              >
                {["day", "title", "description", "location"].map((field) => (
                  <TextField
                    fullWidth
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    name={`itinerary[${index}].${field}`}
                    value={values.itinerary[index][field]}
                    onChange={handleChange}
                  />
                ))}

                <TextField
                  fullWidth
                  label="Start Time"
                  name={`itinerary[${index}].startTime`}
                  value={values.itinerary[index].startTime}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="End Time"
                  name={`itinerary[${index}].endTime`}
                  value={values.itinerary[index].endTime}
                  onChange={handleChange}
                />

                <Box>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => remove(index)}
                    aria-label={`Remove itinerary day ${index + 1}`}
                  >
                    Remove Day
                  </Button>
                </Box>
              </Box>
            ))}
            <Button
              variant="outlined"
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
    </Box>
  );
};

export default ItinerarySection;
