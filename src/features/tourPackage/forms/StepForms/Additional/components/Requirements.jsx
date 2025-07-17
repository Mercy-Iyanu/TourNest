import React from "react";
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
    ],
  };

  return (
    <Box sx={{ mb: { xs: 3, md: 6 } }}>
      <Typography variant="subtitle1" color="textPrimary" gutterBottom>
        Special Requirements{" "}
        <Typography component="span" color="error">
          *
        </Typography>
      </Typography>
      <FormControl fullWidth required>
        <ReactQuill
          value={requirements}
          onChange={setRequirements}
          modules={modules}
          placeholder="Minimum fitness level required, recommended attire, dietary restrictions and so on"
          style={{
            height: "200px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginTop: "8px",
          }}
        />
      </FormControl>
    </Box>
  );
};

export default Requirements;
