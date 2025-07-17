import React from "react";
import { TextField, Typography, Box, Grid } from "@mui/material";

const NumberOfParticipants = ({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
}) => {
  return (
    <Box sx={{ mb: { xs: 2, md: 4 } }}>
      <Typography variant="body1" sx={{ color: "text.primary", mb: 1 }}>
        Group Size{" "}
        <Typography component="span" color="error">
          *
        </Typography>
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
            Minimum Group Size
          </Typography>
          <TextField
            fullWidth
            type="number"
            variant="outlined"
            placeholder="Enter minimum group size"
            value={minValue}
            onChange={(e) => onMinChange(e.target.value)}
            inputProps={{ min: 1 }}
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
            Maximum Group Size
          </Typography>
          <TextField
            fullWidth
            type="number"
            variant="outlined"
            placeholder="Enter maximum group size"
            value={maxValue}
            onChange={(e) => onMaxChange(e.target.value)}
            inputProps={{ min: minValue || 1 }}
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NumberOfParticipants;
