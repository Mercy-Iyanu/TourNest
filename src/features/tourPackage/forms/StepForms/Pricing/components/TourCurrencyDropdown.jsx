import React, { useState, useEffect } from "react";
import currencyCodes from "currency-codes";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Typography,
} from "@mui/material";

const TourCurrencyDropdown = ({ currency, onChange }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(currency || "");

  useEffect(() => {
    if (currency) {
      setSelectedCurrency(currency);
    }
  }, [currency]);

  const handleCurrencyChange = (event) => {
    const selected = event.target.value;
    setSelectedCurrency(selected);
    onChange(selected);
  };

  const currencies = currencyCodes.data
    .filter((c) => c.code && c.currency)
    .sort((a, b) => a.currency.localeCompare(b.currency));

  return (
    <Box className="mb-6">
      <FormControl fullWidth required>
        <InputLabel id="currency-label">Currency code</InputLabel>
        <Select
          labelId="currency-label"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
          label="Currency code"
        >
          <MenuItem value="" disabled>
            Choose currency
          </MenuItem>
          {currencies.map((currency) => (
            <MenuItem key={currency.code} value={currency.code}>
              {`${currency.currency} (${currency.code})`}
            </MenuItem>
          ))}
        </Select>
        <Typography variant="caption" color="error">
          * Required
        </Typography>
      </FormControl>
    </Box>
  );
};

export default TourCurrencyDropdown;
