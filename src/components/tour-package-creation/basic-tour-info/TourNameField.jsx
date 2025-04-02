import React from 'react';
import { FaMountain } from 'react-icons/fa';
import { TextField, Box, Typography } from '@mui/material';

const TourNameField = () => {
  const [tourName, setTourName] = React.useState('');

  const handleChange = (event) => {
    setTourName(event.target.value);
  };
  return (
    <Box className="mb-4 md:mb-8">
      <Typography className="text-base md:text-sm text-gray-800">
        Name of the Tour <span className="text-red-500">*</span>
      </Typography>
      <TextField
        fullWidth
        required
        variant="outlined"
        value={tourName}
        onChange={handleChange}
        placeholder="e.g. Obudu Ranch"
        className="bg-white rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      />
    </Box>
  );
};

export default TourNameField;