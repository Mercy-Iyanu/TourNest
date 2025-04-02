import React, { useState } from "react";
import { TextField, Box, Typography } from "@mui/material";

const TourCostPerPerson = () => {
  const [price, setPrice] = useState("");

  const handleChange = (event) => {
    setPrice(event.target.value);
  };

  return (
    <Box className="mb-4 md:mb-8">
      <Typography className="text-base md:text-sm text-gray-800">
        Price per Person <span className="text-red-500">*</span>
      </Typography>

      <TextField
        fullWidth
        required
        type="number"
        variant="outlined"
        value={price}
        onChange={handleChange}
        placeholder="Enter price"
        inputProps={{ min: "0", step: "0.01" }}
        className="bg-white rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      />
    </Box>
  );
};

export default TourCostPerPerson;