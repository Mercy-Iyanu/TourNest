import React from "react";
import { TextField, Box, Typography, Grid, Checkbox, FormControlLabel } from "@mui/material";

const TourDateDuration = ({ availability, onChange }) => {
  const handleChange = (index, field, value) => {
    const updated = [...availability];
    updated[index][field] = value;
    onChange(updated);
  };

  const handleAddAvailability = () => {
    const updated = [...availability, {
        start_date: "",
        end_date: "",
        is_available: true,
        max_guests: "",
      },
    ];
    onChange(updated);
  };

  return (
    <Box className="space-y-6 p-4 md:p-6 border-2 border-[#1D777D] rounded-lg">
      <Typography className="text-base md:text-sm text-gray-800">
        Tour Availability
        <span className="text-red-500 ml-1">*</span>
      </Typography>
      
      {availability.map((item, index) => (
        <Grid container spacing={4} key={index}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Date"
              type="datetime-local"
              fullWidth
              value={item.start_date}
              onChange={(e) => handleChange(index, "start_date", e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              className="bg-white"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="End Date"
              type="datetime-local"
              fullWidth
              value={item.end_date}
              onChange={(e) => handleChange(index, "end_date", e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              className="bg-white"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.is_available}
                  onChange={() => handleChange(index, "is_available", !item.is_available)}
                />
              }
              label="Available"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Max Guests"
              type="number"
              fullWidth
              value={item.max_guests}
              onChange={(e) => handleChange(index, "max_guests", e.target.value)}
              className="bg-white"
            />
          </Grid>
        </Grid>
      ))}

      <div className="flex justify-end mt-4">
        <button
        disabled
          type="button"
          onClick={handleAddAvailability}
          className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
        >
          Add Availability
        </button>
      </div>
    </Box>
  );
};

export default TourDateDuration;