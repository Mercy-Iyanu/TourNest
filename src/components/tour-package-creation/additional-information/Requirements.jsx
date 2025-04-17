import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FormControl, Typography, Box } from "@mui/material";

const Requirements = ({ requirements, setRequirements }) => {
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
      <Typography className="text-base md:text-sm text-gray-800">
        Special Requirements <span className="text-red-500">*</span>
      </Typography>
      <FormControl fullWidth required>
        <ReactQuill
          value={requirements}
          onChange={setRequirements}
          modules={modules}
          placeholder="Minimum fitness level required, recommended attire, dietary restrictions and so on"
          className="h-[200px] w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-[#1D777D] focus:outline-none"
        />
      </FormControl>  
    </Box>
  );
};

export default Requirements;
