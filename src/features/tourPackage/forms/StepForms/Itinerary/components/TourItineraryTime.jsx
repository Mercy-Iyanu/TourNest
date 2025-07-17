import React from "react";
import { TextField, Box, Typography, Grid } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  LocalizationProvider,
  DesktopDateTimePicker,
} from "@mui/x-date-pickers";

const TourItineraryTime = ({ location, startTime, endTime, onChange }) => {
  return (
    <Box sx={{ mb: 4 }}>
      {/* Location Field */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 1, color: "text.primary" }}>
          Location <span style={{ color: "red" }}>*</span>
        </Typography>
        <TextField
          fullWidth
          required
          variant="outlined"
          value={location}
          onChange={(e) => onChange("location", e.target.value)}
          placeholder="e.g. Obudu Ranch gate"
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
          }}
        />
      </Box>

      {/* Time Pickers */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{ mb: 1, color: "text.primary" }}
            >
              Start Time <span style={{ color: "red" }}>*</span>
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDateTimePicker
                value={startTime}
                onChange={(newVal) => onChange("startTime", newVal)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    sx={{
                      backgroundColor: "white",
                      borderRadius: 1,
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{ mb: 1, color: "text.primary" }}
            >
              End Time <span style={{ color: "red" }}>*</span>
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDateTimePicker
                value={endTime}
                onChange={(newVal) => onChange("endTime", newVal)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    sx={{
                      backgroundColor: "white",
                      borderRadius: 1,
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TourItineraryTime;
