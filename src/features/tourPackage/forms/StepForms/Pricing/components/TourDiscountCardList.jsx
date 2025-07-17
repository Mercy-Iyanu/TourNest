import React from "react";
import {
  TextField,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const TourDiscountCardList = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const handleSave = () => {
    console.log({
      discountType: data.discountType,
      discountValue: data.discountValue,
      minGroupSize: data.minGroupSize,
      startDate: data.startDate,
      endDate: data.endDate,
    });
  };

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
        Discounts for Group Sizes or Advance Bookings
      </Typography>

      <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
        <InputLabel>Discount Type</InputLabel>
        <Select
          value={data?.discountType || ""}
          onChange={(e) => handleChange("discountType", e.target.value)}
          label="Discount Type"
        >
          <MenuItem value="group_size">Group Size</MenuItem>
          <MenuItem value="advance_booking">Advance Booking</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Discount Value (%)"
        type="number"
        fullWidth
        value={data?.discountValue || ""}
        onChange={(e) => handleChange("discountValue", e.target.value)}
        placeholder="Enter discount value"
        inputProps={{ min: "0", step: "0.01" }}
        variant="outlined"
        sx={{ mb: 3 }}
      />

      {data.discountType === "group_size" && (
        <TextField
          label="Minimum Group Size"
          type="number"
          fullWidth
          value={data.minGroupSize}
          onChange={(e) => handleChange("minGroupSize", e.target.value)}
          placeholder="Enter minimum group size"
          inputProps={{ min: "1" }}
          variant="outlined"
          sx={{ mb: 3 }}
        />
      )}

      {data.discountType === "advance_booking" && (
        <>
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            value={data.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 3 }}
          />

          <TextField
            label="End Date"
            type="date"
            fullWidth
            value={data.endDate}
            onChange={(e) => handleChange("endDate", e.target.value)}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 3 }}
          />
        </>
      )}

      <Button
        type="button"
        variant="contained"
        sx={{
          bgcolor: "teal.600",
          "&:hover": {
            bgcolor: "teal.700",
          },
        }}
        onClick={handleSave}
      >
        Save Discount
      </Button>
    </Box>
  );
};

export default TourDiscountCardList;
