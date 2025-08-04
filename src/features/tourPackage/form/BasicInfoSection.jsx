import React from "react";
import {
  TextField,
  Typography,
  Box,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
} from "@mui/material";
import { useFormikContext } from "formik";

const BasicInfoSection = () => {
  const { values, handleChange, touched, errors } = useFormikContext();

  const fields = [
    "tour_name",
    "description",
    "country",
    "state",
    "city",
    "duration",
  ];

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6" gutterBottom>
        Basic Info
      </Typography>

      {fields.map((field) => (
        <TextField
          key={field}
          fullWidth
          label={field
            .replace("_", " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())}
          name={`basicInfo.${field}`}
          value={values.basicInfo[field]}
          onChange={handleChange}
          error={
            touched.basicInfo?.[field] && Boolean(errors.basicInfo?.[field])
          }
          helperText={touched.basicInfo?.[field] && errors.basicInfo?.[field]}
        />
      ))}

      <FormControl
        fullWidth
        error={
          touched.basicInfo?.tour_type && Boolean(errors.basicInfo?.tour_type)
        }
      >
        <InputLabel>Tour Type</InputLabel>
        <Select
          name="basicInfo.tour_type"
          value={values.basicInfo.tour_type}
          onChange={handleChange}
        >
          <MenuItem value="adventure">Adventure</MenuItem>
          <MenuItem value="leisure">Leisure</MenuItem>
          <MenuItem value="cultural">Cultural</MenuItem>
          <MenuItem value="wildlife">Wildlife</MenuItem>
        </Select>

        {touched.basicInfo?.tour_type && errors.basicInfo?.tour_type && (
          <FormHelperText>{errors.basicInfo.tour_type}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default BasicInfoSection;
