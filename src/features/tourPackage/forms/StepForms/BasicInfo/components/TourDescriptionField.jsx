import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Typography, FormControl } from "@mui/material";

const TourDescriptionField = ({ value, onChange }) => {
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
    ],
  };

  return (
    <Box className="mb-4 md:mb-8">
      <Typography className="text-base md:text-sm text-gray-800 mb-2">
        Detailed description of the tour <span className="text-red-500">*</span>
      </Typography>
      <FormControl fullWidth required>
        <ReactQuill
          value={value}
          onChange={onChange}
          modules={modules}
          placeholder="e.g. With rich natural vegetation and a picturesque view, Obudu is increasingly becoming popular"
        />
      </FormControl>
    </Box>
  );
};

export default TourDescriptionField;
