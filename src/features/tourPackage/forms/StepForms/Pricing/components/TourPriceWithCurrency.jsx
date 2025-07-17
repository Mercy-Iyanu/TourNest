import React from "react";
import {
  TextField,
  InputAdornment,
  MenuItem,
  Box,
  Typography,
  Select,
  FormControl,
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
    <Box sx={{ mb: { xs: 4, md: 6 } }}>
      <Typography variant="body1" sx={{ mb: 1, color: "text.primary" }}>
        Price per Person <span style={{ color: "red" }}>*</span>
      </Typography>

      <TextField
        fullWidth
        required
        type="number"
        variant="outlined"
        value={value}
        onChange={(e) => onPriceChange(e.target.value)}
        inputProps={{ min: "0", step: "0.01" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ mr: 1 }}>
              <FormControl variant="standard" sx={{ minWidth: 70 }}>
                <Select
                  value={currency}
                  onChange={(e) => onCurrencyChange(e.target.value)}
                  disableUnderline
                  sx={{
                    fontSize: "0.9rem",
                  }}
                >
                  {currencies.map((cur) => (
                    <MenuItem key={cur.code} value={cur.code}>
                      {cur.code}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default TourPriceWithCurrency;
