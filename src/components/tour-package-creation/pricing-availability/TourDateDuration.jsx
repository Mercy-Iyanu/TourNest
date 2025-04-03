import React, { useState } from "react";
import { TextField, Box, Typography, Grid, Checkbox, FormControlLabel } from "@mui/material";

const TourDateDuration = () => {
  const [availability, setAvailability] = useState([
    {
      start_date: "",
      end_date: "",
      is_available: true,
      max_guests: "",
    },
  ]);

  const handleDateChange = (index, field, value) => {
    const newAvailability = [...availability];
    newAvailability[index][field] = value;
    setAvailability(newAvailability);
  };

  const handleAvailabilityChange = (index) => {
    const newAvailability = [...availability];
    newAvailability[index].is_available = !newAvailability[index].is_available;
    setAvailability(newAvailability);
  };

  const handleMaxGuestsChange = (index, value) => {
    const newAvailability = [...availability];
    newAvailability[index].max_guests = value;
    setAvailability(newAvailability);
  };

  const handleAddAvailability = () => {
    setAvailability([
      ...availability,
      {
        start_date: "",
        end_date: "",
        is_available: true,
        max_guests: "",
      },
    ]);
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
              onChange={(e) => handleDateChange(index, "start_date", e.target.value)}
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
              onChange={(e) => handleDateChange(index, "end_date", e.target.value)}
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
                  onChange={() => handleAvailabilityChange(index)}
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
              onChange={(e) => handleMaxGuestsChange(index, e.target.value)}
              className="bg-white"
            />
          </Grid>
        </Grid>
      ))}

      <div className="flex justify-end mt-4">
        <button
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