import React, { useState } from 'react';
import { TextField, Box, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const TourDiscountCardList = () => {
  const [discountType, setDiscountType] = useState('');
  const [discountValue, setDiscountValue] = useState('');
  const [minGroupSize, setMinGroupSize] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleDiscountTypeChange = (event) => {
    setDiscountType(event.target.value);
  };
  const handleDiscountValueChange = (event) => {
    setDiscountValue(event.target.value);
  };
  const handleMinGroupSizeChange = (event) => {
    setMinGroupSize(event.target.value);
  };
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
    <Box className="mb-6">
      <Typography className="text-xl font-semibold text-gray-800">Discounts for Group Sizes or Advance Bookings</Typography>

      <div className="mb-4">
        <FormControl fullWidth variant="outlined">
          <InputLabel>Discount Type</InputLabel>
          <Select
            value={discountType}
            onChange={handleDiscountTypeChange}
            label="Discount Type"
            className="mb-4"
          >
            <MenuItem value="group_size">Group Size</MenuItem>
            <MenuItem value="advance_booking">Advance Booking</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="mb-4">
        <TextField
          label="Discount Value (%)"
          type="number"
          fullWidth
          value={discountValue}
          onChange={handleDiscountValueChange}
          placeholder="Enter discount value"
          inputProps={{ min: "0", step: "0.01" }}
          variant="outlined"
        />
      </div>

      {discountType === "group_size" && (
        <div className="mb-4">
          <TextField
            label="Minimum Group Size"
            type="number"
            fullWidth
            value={minGroupSize}
            onChange={handleMinGroupSizeChange}
            placeholder="Enter minimum group size"
            inputProps={{ min: "1" }}
            variant="outlined"
          />
        </div>
      )}

      {discountType === "advance_booking" && (
        <>
          <div className="mb-4">
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              value={startDate}
              onChange={handleStartDateChange}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </div>

          <div className="mb-4">
            <TextField
              label="End Date"
              type="date"
              fullWidth
              value={endDate}
              onChange={handleEndDateChange}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </div>
        </>
      )}

      <Button
        type='button'
        className="px-6 py-2 bg-teal-600 text-white rounded-md"
        onClick={() => {
          console.log({
            discountType,
            discountValue,
            minGroupSize,
            startDate,
            endDate,
          });
        }}
      >
        Save Discount
      </Button>
    </Box>
  );
};

export default TourDiscountCardList;