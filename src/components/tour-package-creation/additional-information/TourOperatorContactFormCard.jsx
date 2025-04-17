import React from "react";
import { TextField, Typography } from "@mui/material";

const TourOperatorContactFormCard = ({ contact, handleChange }) => {
  return (
    <div className="mb-4 md:mb-8 space-y-4">
      <Typography className="text-base md:text-sm text-gray-800">
        Contact Information <span className="text-red-500">*</span>
      </Typography>

      <TextField
        label="Contact Name"
        name="name"
        variant="outlined"
        fullWidth
        value={contact.name}
        onChange={handleChange}
        placeholder="Enter contact name"
        className="bg-white"
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
        className="bg-white"
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
        className="bg-white"
      />
    </div>
  );
};

export default TourOperatorContactFormCard;