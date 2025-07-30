import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Stack,
  TextField,
  Alert,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { useNavigate } from "react-router-dom";

const paymentOptions = ["Paystack", "Flutterwave", "Bank Transfer"];

const TourBookingForm = () => {
  const { tourId } = useParams();
  const [searchParams] = useSearchParams();
  const distributorId = searchParams.get("distributorId");
  const tourTitle = searchParams.get("tourTitle");
  const [tour, setTour] = useState(null);

  const navigate = useNavigate();
  const [status, setStatus] = React.useState({
    loading: false,
    success: "",
    error: "",
  });
  const [loadingTour, setLoadingTour] = useState(true);

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/widget/${distributorId}?tourId=${tourId}`
        );
        if (!response.ok) throw new Error("Tour not found");

        const data = await response.json();
        setTour(data);
      } catch (err) {
        setStatus((prev) => ({
          ...prev,
          error: err.message || "Failed to load tour",
        }));
      } finally {
        setLoadingTour(false);
      }
    };

    fetchTourDetails();
  }, [tourId]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      date: "",
      phone: "",
      travelers: 1,
      paymentMethod: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      date: Yup.date().required("Date is required"),
      phone: Yup.string().required("Phone number is required"),
      travelers: Yup.number().min(1, "Must be at least 1").required(),
    }),
    onSubmit: async (values) => {
      setStatus({ loading: true, success: "", error: "" });

      if (window.dataLayer) {
        window.dataLayer.push({
          event: "tour_booking_attempt",
          bookingData: { ...values, tourTitle },
        });
      }

      try {
        const res = await fetch("http://localhost:5000/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tourId,
            distributorId,
            userDetails: {
              name: values.name,
              email: values.email,
              phone: values.phone,
            },
            date: values.date,
            travelers: values.travelers,
          }),
        });

        if (!res.ok) throw new Error("Booking failed");

        setStatus({
          loading: false,
          success: "Booking submitted successfully!",
          error: "",
        });

        if (window.dataLayer) {
          window.dataLayer.push({
            event: "tour_booking_success",
            bookingData: { ...values, tourTitle },
          });
        }

        formik.resetForm();
      } catch (err) {
        setStatus({
          loading: false,
          success: "",
          error: err.message || "Something went wrong",
        });
      }
    },
  });

  if (loadingTour) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="body1">Loading tour details...</Typography>
      </Box>
    );
  }

  if (!tour) {
    return (
      <Box textAlign="center" mt={5}>
        <Alert severity="error">{status.error || "Failed to load tour."}</Alert>
        <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          ← Back
        </Button>
      </Box>
    );
  }

  return (
    <Box
      component="section"
      sx={{
        p: { xs: 3, sm: 4 },
        bgcolor: "background.paper",
        borderRadius: 3,
        boxShadow: 4,
        maxWidth: 600,
        mx: "auto",
        mt: 5,
      }}
    >
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        ← Back
      </Button>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Book Tour: {tour?.basicInfo?.tour_name}
      </Typography>

      <Typography variant="subtitle1" fontWeight="medium" mb={3}>
        Price: {tour?.currency || "₦"} {tour?.price?.toLocaleString()}
      </Typography>

      <form onSubmit={formik.handleSubmit} noValidate>
        <Stack spacing={2}>
          <TextField
            label="Full Name"
            name="name"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && !!formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            label="Email Address"
            name="email"
            fullWidth
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Travel Date"
            name="date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: new Date().toISOString().split("T")[0] }}
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.date && !!formik.errors.date}
            helperText={formik.touched.date && formik.errors.date}
          />
          <PhoneInput
            country="ng"
            value={formik.values.phone}
            onChange={(phone) => formik.setFieldValue("phone", phone)}
            inputStyle={{ width: "100%" }}
          />
          {formik.touched.phone && formik.errors.phone && (
            <Typography color="error" fontSize={12}>
              {formik.errors.phone}
            </Typography>
          )}
          <TextField
            label="Number of Travelers"
            name="travelers"
            type="number"
            inputProps={{ min: 1 }}
            fullWidth
            value={formik.values.travelers}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.travelers && !!formik.errors.travelers}
            helperText={formik.touched.travelers && formik.errors.travelers}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={status.loading}
          >
            {status.loading ? "Submitting..." : "Proceed to Payment"}
          </Button>

          {status.success && <Alert severity="success">{status.success}</Alert>}
          {status.error && <Alert severity="error">{status.error}</Alert>}
        </Stack>
      </form>
    </Box>
  );
};

export default TourBookingForm;
