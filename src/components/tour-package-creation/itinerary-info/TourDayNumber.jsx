import React, {useState} from 'react';
import { TextField, Box, Typography } from '@mui/material';

const TourDayNumber = () => {
  const [day, setDay] = useState('');

  const handleChange = (event) => {
    if (/^\d*$/.test(event.target.value)) {
      setDay(event.target.value);
    }
  };
  return (
    <Box className="mb-4 md:mb-8 space-y-4">
      <Typography className="text-base md:text-sm text-gray-800">
      Day Number <span className="text-red-500">*</span>
      </Typography>
          
      <TextField
        fullWidth
        required
        variant="outlined"
        value={day}
        onChange={handleChange}
        placeholder="e.g. 1"
        className="bg-white rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      />
    </Box>
  );
};

export default TourDayNumber;