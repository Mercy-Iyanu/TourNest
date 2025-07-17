import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Typography, FormControl } from "@mui/material";

const TourActivityDescription = ({ value, onChange }) => {
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
      // 'table' is not native to ReactQuill; consider using plugins if needed
    ],
  };

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Description of the activities for the day{" "}
        <span style={{ color: "red" }}>*</span>
      </Typography>
      <FormControl fullWidth required>
        <Box
          sx={{
            "& .ql-container": {
              height: 200,
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
            },
            "& .ql-toolbar": {
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
            },
            "& .ql-container, & .ql-toolbar": {
              borderColor: "#ccc",
            },
            "& .ql-container:focus-within, & .ql-toolbar:focus-within": {
              borderColor: "#1D777D",
              boxShadow: "0 0 0 2px #1D777D33",
            },
          }}
        >
          <ReactQuill
            value={value}
            onChange={onChange}
            modules={modules}
            placeholder="e.g. Enjoy the beautiful sights at Obudu Cattle Ranch"
          />
        </Box>
      </FormControl>
    </Box>
  );
};

export default TourActivityDescription;
