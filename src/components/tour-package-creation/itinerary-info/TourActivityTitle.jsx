import React, {useState} from 'react';
import { TextField, Box, Typography } from '@mui/material';

const TourActivityTitle = () => {
  const [title, setTitle] = useState('');

  const handleChange = (event) => {
    setTitle(event.target.value);
  };
  return (
    <Box className="mb-4 md:mb-8 space-y-4">
      <Typography className="text-base md:text-sm text-gray-800">
      Activity Title <span className="text-red-500">*</span>
            </Typography>
      <div className="mb-4">
      <TextField
        fullWidth
        required
        variant="outlined"
        value={title}
        onChange={handleChange}
        placeholder='e.g Registration and setting out to the cattle ranch'
        className="bg-white rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      />
      </div>
    </Box>
  );
};

export default TourActivityTitle;