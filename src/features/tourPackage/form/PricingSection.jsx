import React from "react";
import { TextField, MenuItem, Typography, Box } from "@mui/material";
import { useFormikContext } from "formik";

const currencies = ["USD", "NGN", "EUR"];

const PricingSection = () => {
  const { values, handleChange } = useFormikContext();

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6" gutterBottom>
        Pricing
      </Typography>

      <TextField
        fullWidth
        label="Price Per Person"
        name="pricing.pricePerPerson"
        type="number"
        value={values.pricing.pricePerPerson}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        select
        label="Currency"
        name="pricing.currency"
        value={values.pricing.currency}
        onChange={handleChange}
      >
        {currencies.map((cur) => (
          <MenuItem key={cur} value={cur}>
            {cur}
          </MenuItem>
        ))}
      </TextField>

      <Typography variant="subtitle1">Discount (Optional)</Typography>

      <TextField
        fullWidth
        label="Discount Value"
        name="pricing.discount.discountValue"
        type="number"
        value={values.pricing.discount?.discountValue ?? ""}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        label="Minimum Group Size"
        name="pricing.discount.minGroupSize"
        type="number"
        value={values.pricing.discount?.minGroupSize ?? ""}
        onChange={handleChange}
      />
    </Box>
  );
};

export default PricingSection;
