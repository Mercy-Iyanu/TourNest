import React, { useState } from "react";
import { TextField, Typography } from "@mui/material";

const TourOperatorContactFormCard = () => {
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="mb-4 md:mb-8 space-y-4">
      <Typography className="text-base md:text-sm text-gray-800">
        Contact Information <span className="text-red-500">*</span>
      </Typography>

      {/* Contact Name */}
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

      {/* Contact Phone */}
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

      {/* Contact Email */}
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