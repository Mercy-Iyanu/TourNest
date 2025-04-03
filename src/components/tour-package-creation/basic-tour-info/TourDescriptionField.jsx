import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { Box, Typography, FormControl } from '@mui/material';

const TourDescriptionField = () => {
  const [text, setText] = useState('');

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      ["link", "image", "video"],
      ["blockquote", "code-block"],
      [{ script: "sub" }, { script: "super" }],
      [{ color: [] }, { background: [] }],
      ["table"],
    ],
  };

  return (
    <Box className="mb-4 md:mb-8">
      <Typography 
        className="text-base md:text-smtext-gray-800"
      >
        Detailed description of the tour <span className="text-red-500">*</span>
      </Typography>
      <FormControl fullWidth required>
        <ReactQuill
          modules={modules}
          placeholder='e.g With rich natural vegetation and a picturesque view, Obudu is increasingly becoming popular '
          className="h-[200px] w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-[#1D777D] focus:outline-non"
        />
      </FormControl>
    </Box>
  );
};

export default TourDescriptionField;