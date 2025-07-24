import React from "react";
import {
  TextField,
  Typography,
  Grid,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
} from "@mui/material";
import { useFormikContext } from "formik";

const BasicInfoSection = () => {
  const { values, handleChange, touched, errors } = useFormikContext();

  return (
    <>
      <Typography variant="h6" mt={4}>
        Basic Info
      </Typography>
      <Grid container spacing={2}>
        {[
          "tour_name",
          "description",
          "country",
          "state",
          "city",
          "duration",
        ].map((field) => (
          <Grid item xs={12} sm={6} key={field}>
            <TextField
              fullWidth
              label={field.replace("_", " ")}
              name={`basicInfo.${field}`}
              value={values.basicInfo[field]}
              onChange={handleChange}
              error={
                touched.basicInfo?.[field] && Boolean(errors.basicInfo?.[field])
              }
              helperText={
                touched.basicInfo?.[field] && errors.basicInfo?.[field]
              }
            />
          </Grid>
        ))}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Tour Type</InputLabel>
            <Select
              name="basicInfo.tour_type"
              value={values.basicInfo.tour_type}
              onChange={handleChange}
              error={
                touched.basicInfo?.tour_type &&
                Boolean(errors.basicInfo?.tour_type)
              }
            >
              <MenuItem value="adventure">Adventure</MenuItem>
              <MenuItem value="leisure">Leisure</MenuItem>
              <MenuItem value="cultural">Cultural</MenuItem>
              <MenuItem value="wildlife">Wildlife</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default BasicInfoSection;
