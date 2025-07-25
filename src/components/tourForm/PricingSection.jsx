import React from "react";
import { Grid, TextField, MenuItem, Typography } from "@mui/material";
import { useFormikContext } from "formik";

const currencies = ["USD", "NGN", "EUR"];

const PricingSection = () => {
  const { values, handleChange } = useFormikContext();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Pricing</Typography>
      </Grid>

      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Price Per Person"
          name="pricing.pricePerPerson"
          type="number"
          value={values.pricing.pricePerPerson}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={6}>
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
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle1">Discount (Optional)</Typography>
      </Grid>

      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Discount Value"
          name="pricing.discount.discountValue"
          type="number"
          value={values.pricing.discount?.discountValue ?? ""}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Minimum Group Size"
          name="pricing.discount.minGroupSize"
          type="number"
          value={values.pricing.discount?.minGroupSize ?? ""}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default PricingSection;
