import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Stack,
} from "@mui/material";

const TourBookingForm = ({ tourId, distributorId, tourTitle }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    travelers: 1,
  });

  const [status, setStatus] = useState({
    loading: false,
    success: "",
    error: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: "", error: "" });

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tourId,
          distributorId,
          userDetails: {
            name: form.name,
            email: form.email,
          },
          date: form.date,
          travelers: Number(form.travelers),
        }),
      });

      if (!res.ok) throw new Error("Booking failed");

      setStatus({
        loading: false,
        success: "Booking submitted successfully!",
        error: "",
      });
      setForm({ name: "", email: "", date: "", travelers: 1 });
    } catch (err) {
      setStatus({
        loading: false,
        success: "",
        error: err.message || "Something went wrong",
      });
    }
  };

  return (
    <Box
      component="section"
      sx={{
        p: 4,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 500,
        mx: "auto",
        mt: 4,
      }}
    >
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Book: {tourTitle}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            name="name"
            label="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            name="email"
            label="Email Address"
            value={form.email}
            onChange={handleChange}
            type="email"
            required
            fullWidth
          />
          <TextField
            name="date"
            label="Travel Date"
            type="date"
            value={form.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
            fullWidth
          />
          <TextField
            name="travelers"
            label="Number of Travelers"
            type="number"
            inputProps={{ min: 1 }}
            value={form.travelers}
            onChange={handleChange}
            required
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={status.loading}
            fullWidth
          >
            {status.loading ? "Submitting..." : "Confirm Booking"}
          </Button>

          {status.success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {status.success}
            </Alert>
          )}
          {status.error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {status.error}
            </Alert>
          )}
        </Stack>
      </form>
    </Box>
  );
};

export default TourBookingForm;
