import React, { useState, useEffect } from 'react';
import currencyCodes from 'currency-codes';
import { FormControl, InputLabel, MenuItem, Select, Box } from '@mui/material';

const TourCurrencyDropdown = ({ currency, onChange }) => {  
  const [selectedCurrency, setSelectedCurrency] = useState(currency || '');

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

  const currencies = currencyCodes.data;

  return (
    <Box className="mb-6">
      <FormControl fullWidth>
        <InputLabel id="currency-label">
          Currency code
          <span className="text-red-500">*</span>
        </InputLabel>
        <Select
          labelId="currency-label"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
          label="Currency code"
          fullWidth
          className="bg-white rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      </FormControl>
    </Box>
  );
};

export default TourCurrencyDropdown;
