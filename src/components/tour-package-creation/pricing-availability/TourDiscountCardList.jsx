import React from 'react';
import { TextField, Box, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const TourDiscountCardList = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  return (
    <Box className="mb-6">
      <Typography className="text-xl font-semibold text-gray-800">Discounts for Group Sizes or Advance Bookings</Typography>

      <div className="mb-4">
        <FormControl fullWidth variant="outlined">
          <InputLabel>Discount Type</InputLabel>
          <Select
            value={data?.discountType || ''}
            onChange={(e) => handleChange('discountType', e.target.value)}
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
          value={data?.discountValue || ''}
          onChange={(e) => handleChange('discountValue', e.target.value)}
          placeholder="Enter discount value"
          inputProps={{ min: "0", step: "0.01" }}
          variant="outlined"
        />
      </div>

      {data.discountType === "group_size" && (
        <div className="mb-4">
          <TextField
            label="Minimum Group Size"
            type="number"
            fullWidth
            value={data.minGroupSize}
            onChange={(e) => handleChange('minGroupSize', e.target.value)}
            placeholder="Enter minimum group size"
            inputProps={{ min: "1" }}
            variant="outlined"
          />
        </div>
      )}

      {data.discountType === "advance_booking" && (
        <>
          <div className="mb-4">
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              value={data.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </div>

          <div className="mb-4">
            <TextField
              label="End Date"
              type="date"
              fullWidth
              value={data.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
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