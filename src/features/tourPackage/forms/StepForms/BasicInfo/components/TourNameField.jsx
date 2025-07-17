import React from "react";
import { TextField, Box, Typography } from "@mui/material";

const TourNameField = ({ value, onChange }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="body1" sx={{ mb: 1 }}>
        Name of the Tour <span style={{ color: "red" }}>*</span>
      </Typography>
      <TextField
        fullWidth
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Obudu Ranch"
        variant="outlined"
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
        }}
      />
    </Box>
  );
};

export default TourNameField;
