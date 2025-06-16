import React from "react";
import {
  TextField,
  InputAdornment,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import currencyCodes from "currency-codes";

const TourPriceWithCurrency = ({
  value,
  currency,
  onPriceChange,
  onCurrencyChange,
}) => {
  const currencies = currencyCodes.data;

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
        value={value}
        onChange={(e) => onPriceChange(e.target.value)}
        inputProps={{ min: "0", step: "0.01" }}
        className="bg-white"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <TextField
                select
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value)}
                variant="standard"
                sx={{
                  width: 80,
                  backgroundColor: "transparent",
                  "& .MuiInputBase-input": {
                    fontSize: "0.875rem",
                    paddingBottom: "0",
                  },
                }}
              >
                {currencies.map((cur) => (
                  <MenuItem key={cur.code} value={cur.code}>
                    {cur.code}
                  </MenuItem>
                ))}
              </TextField>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default TourPriceWithCurrency;
