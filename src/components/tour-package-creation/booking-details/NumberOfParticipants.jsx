import React, { useState } from "react";
import { TextField, Typography, Box } from "@mui/material";

const NumberOfParticipants = () => {
  const [minGroupSize, setMinGroupSize] = useState("");
  const [maxGroupSize, setMaxGroupSize] = useState("");

  const handleMinChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setMinGroupSize(value);
    }
  };

  const handleMaxChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setMaxGroupSize(value);
    }
  };

  return (
    <Box className="mb-4 md:mb-8">
      <Typography className="text-base md:text-sm text-gray-800">
        Group Size <span className="text-red-500">*</span>
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Typography className="text-sm text-gray-700 mb-4">
            Minimum Group Size
          </Typography>
          <TextField
            fullWidth
            type="number"
            variant="outlined"
            placeholder="Enter min group size"
            value={minGroupSize}
            onChange={handleMinChange}
            inputProps={{ min: 1 }}
            className="bg-white rounded-md"
          />
        </div>

        <div>
          <Typography className="text-xs text-gray-700 mb-1">
            Maximum Group Size
          </Typography>
          <TextField
            fullWidth
            type="number"
            variant="outlined"
            placeholder="Enter max group size"
            value={maxGroupSize}
            onChange={handleMaxChange}
            inputProps={{ min: minGroupSize || 1 }}
            className="bg-white rounded-md"
          />
        </div>
      </div>
    </Box>
  );
};

export default NumberOfParticipants;
