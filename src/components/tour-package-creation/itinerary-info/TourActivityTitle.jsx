import React from 'react';
import { TextField, Box, Typography } from '@mui/material';

const TourActivityTitle = ({ value, onChange }) => {
  return (
    <Box className="mb-4 md:mb-8">
      <Typography className="text-base md:text-sm text-gray-800">
      Activity Title <span className="text-red-500">*</span>
            </Typography>
      <div className="mb-4">
      <TextField
        fullWidth
        required
        variant="outlined"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='e.g Registration and setting out to the cattle ranch'
        className="bg-white rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      />
      </div>
    </Box>
  );
};

export default TourActivityTitle;