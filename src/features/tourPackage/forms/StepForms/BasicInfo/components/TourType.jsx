import React from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const TourType = ({ value, onChange }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <FormControl fullWidth required>
        <InputLabel id="tour-type-label">Tour Type</InputLabel>
        <Select
          labelId="tour-type-label"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          label="Tour Type"
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "gray.300",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1D777D",
            },
          }}
        >
          <MenuItem value="adventure">Adventure</MenuItem>
          <MenuItem value="cultural">Cultural</MenuItem>
          <MenuItem value="historical">Historical</MenuItem>
          <MenuItem value="culinary">Culinary</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default TourType;
