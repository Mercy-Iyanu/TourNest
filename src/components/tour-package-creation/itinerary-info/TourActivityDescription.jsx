import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Box, Typography, FormControl } from '@mui/material';

const TourActivityDescription = () => {
  const [text, setText] = useState('');

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: [] }],
      ['link'],
      ['blockquote'],
      [{ script: 'sub' }, { script: 'super' }],
      ['image'],
    ],
  };

  return (
    <Box className="mb-4 md:mb-8">
      <Typography className="text-base md:text-smtext-gray-800">
        Description of the activities for the day <span className="text-red-500">*</span>
      </Typography>
      <FormControl fullWidth required>
        <ReactQuill
          modules={modules}
          placeholder='e.g  Enjoy the beautiful sights at Obudu Cattle Ranch'
          className="h-[200px] w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-[#1D777D] focus:outline-non" 
        />
      </FormControl>
    </Box>
  );
};

export default TourActivityDescription;