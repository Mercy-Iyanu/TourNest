import React from "react";
import { TextField, Typography, Box } from "@mui/material";

const TourOperatorContactFormCard = ({ contact, handleChange }) => {
  return (
    <Box sx={{ mb: { xs: 3, md: 6 } }}>
      <Typography variant="subtitle1" color="textPrimary" gutterBottom>
        Contact Information{" "}
        <Typography component="span" color="error">
          *
        </Typography>
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        <TextField
          label="Contact Name"
          name="name"
          variant="outlined"
          fullWidth
          value={contact.name}
          onChange={handleChange}
          placeholder="Enter contact name"
        />

        <TextField
          label="Phone Number"
          name="phone"
          type="tel"
          variant="outlined"
          fullWidth
          value={contact.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
        />

        <TextField
          label="Email Address"
          name="email"
          type="email"
          variant="outlined"
          fullWidth
          value={contact.email}
          onChange={handleChange}
          placeholder="Enter email address"
        />
      </Box>
    </Box>
  );
};

export default TourOperatorContactFormCard;
