import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Box, Typography } from '@mui/material';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DesktopDateTimePicker } from "@mui/x-date-pickers";

const TourItineraryTime = ({ location, startTime, endTime, onChange }) => {
  return (
    <div>
      <Box className="mb-4 md:mb-8">
        <Typography className="text-base md:text-sm text-gray-800">
          Location <span className="text-red-500">*</span>
        </Typography>
        <TextField
          fullWidth
          required
          variant="outlined"
          value={location}
          onChange={(e) => onChange("location", e.target.value)}
          placeholder="e.g Obudu Ranch gate"
          id="location"
        />
      </Box>
      <div className='flex justify-between gap-4 w-full'>
        <Box className="mb-4 w-1/2">
          <Typography className="text-base md:text-sm md:text-sm text-gray-800">
            Start Time <span className="text-red-500">*</span>
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDateTimePicker
              value={startTime}
              onChange={(newVal) => onChange("startTime", newVal)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  variant="outlined"
                  className="bg-white rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            />
          </LocalizationProvider>
        </Box>
        <Box className="mb-4 w-1/2">
          <Typography className="text-base md:text-sm text-gray-800">
            End Time <span className="text-red-500">*</span>
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDateTimePicker
              value={endTime}
              onChange={(newVal) => onChange("endTime", newVal)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  variant="outlined"
                  className="bg-white rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            />
          </LocalizationProvider>
        </Box>
      </div>
    </div>
  );
};

export default TourItineraryTime;