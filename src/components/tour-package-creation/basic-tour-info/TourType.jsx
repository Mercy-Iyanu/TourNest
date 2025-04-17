import React, { useState } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

const TourType = ({ value, onChange }) => {
    const [tourType, setTourType] = React.useState('');
  
    const handleChange = (event) => {
      setTourType(event.target.value);
    };
  return (
    <Box className="mb-4 md:mb-8">
      <FormControl fullWidth required>
        <InputLabel id="tour-type-label">Tour Type</InputLabel>
        <Select
          labelId="tour-type-label"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          label="Select a suitable tour type"
          className="bg-white rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <MenuItem value="adventure">Adventure</MenuItem>
          <MenuItem value="cultural">Cultural</MenuItem>
          <MenuItem value="historical">Historical</MenuItem>
          <MenuItem value="culinary">Culinary</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default TourType;
