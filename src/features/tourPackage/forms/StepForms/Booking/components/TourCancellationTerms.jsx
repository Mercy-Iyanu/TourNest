import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Typography } from "@mui/material";

const TourCancellationTerms = ({ value, onChange }) => {
  const [cancellationPolicy, setCancellationPolicy] = useState(value || "");

  useEffect(() => {
    setCancellationPolicy(value || "");
  }, [value]);

  const handleChange = (val) => {
    setCancellationPolicy(val);
    onChange(val);
  };

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
    <Box sx={{ mb: { xs: 2, md: 4 } }}>
      <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
        Cancellation Policy{" "}
        <Typography component="span" color="error">
          *
        </Typography>
      </Typography>

      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "grey.300",
          minHeight: 200,
          ".ql-container": {
            border: "none",
            fontSize: "1rem",
          },
          ".ql-toolbar": {
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            border: "none",
            borderBottom: "1px solid #ccc",
          },
          ".ql-editor": {
            minHeight: 150,
          },
        }}
      >
        <ReactQuill
          value={cancellationPolicy}
          onChange={handleChange}
          modules={modules}
          placeholder="Enter cancellation policy..."
        />
      </Box>
    </Box>
  );
};

export default TourCancellationTerms;
