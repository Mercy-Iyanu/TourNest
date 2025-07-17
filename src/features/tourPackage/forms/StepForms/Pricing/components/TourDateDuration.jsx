import React from "react";
import {
  TextField,
  Box,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";

const TourDateDuration = ({ availability, onChange }) => {
  const handleChange = (index, field, value) => {
    const updated = [...availability];
    updated[index][field] = value;
    onChange(updated);
  };

  const handleAddAvailability = () => {
    const updated = [
      ...availability,
      {
        start_date: "",
        end_date: "",
        is_available: true,
        max_guests: "",
      },
    ];
    onChange(updated);
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        border: "2px solid #1D777D",
        borderRadius: 2,
        mb: 4,
      }}
    >
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Tour Availability <span style={{ color: "red" }}>*</span>
      </Typography>

      {availability.map((item, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              value={item.start_date}
              onChange={(e) =>
                handleChange(index, "start_date", e.target.value)
              }
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="End Date"
              type="date"
              fullWidth
              value={item.end_date}
              onChange={(e) => handleChange(index, "end_date", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Max Guests"
              type="number"
              fullWidth
              value={item.max_guests}
              onChange={(e) =>
                handleChange(index, "max_guests", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.is_available}
                  onChange={() =>
                    handleChange(index, "is_available", !item.is_available)
                  }
                />
              }
              label="Available"
            />
          </Grid>
        </Grid>
      ))}

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={handleAddAvailability}
          sx={{ bgcolor: "teal.700", "&:hover": { bgcolor: "teal.800" } }}
        >
          Add Availability
        </Button>
      </Box>
    </Box>
  );
};

export default TourDateDuration;
