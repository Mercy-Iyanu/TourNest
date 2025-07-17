import React from "react";
import { TextField, Box, Typography } from "@mui/material";

const TourActivityTitle = ({ value, onChange }) => {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Activity Title <span style={{ color: "red" }}>*</span>
      </Typography>
      <TextField
        fullWidth
        required
        variant="outlined"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Registration and setting out to the cattle ranch"
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#ccc",
            },
            "&:hover fieldset": {
              borderColor: "#888",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#1D777D",
              boxShadow: "0 0 0 2px rgba(29, 119, 125, 0.2)",
            },
          },
        }}
      />
    </Box>
  );
};

export default TourActivityTitle;
