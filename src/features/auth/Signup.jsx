import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
  Box,
  Divider,
} from "@mui/material";

const SignUp = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    company: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, company } = formData;

    if (!firstName || !lastName || !email || !password || !company || !role) {
      setError("Please fill all required fields and select a role.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          role,
          displayName: `${firstName} ${lastName}`,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed.");
      }

      localStorage.setItem("authUser", JSON.stringify(data.user));
      localStorage.setItem("userRole", role);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      px={2}
    >
      <Card sx={{ maxWidth: 450, width: "100%", boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
          >
            Get Started
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mb={2}
          >
            Fill in your details to create an account
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Typography
            variant="body2"
            textAlign="center"
            color="text.secondary"
            mb={1}
          >
            Select your role
          </Typography>
          <Box display="flex" justifyContent="center" mb={2}>
            <ToggleButtonGroup
              value={role}
              exclusive
              onChange={(e, newRole) => setRole(newRole)}
              fullWidth
              color="primary"
            >
              <ToggleButton value="tour-owner">Tour Owner</ToggleButton>
              <ToggleButton value="tour-distributor">
                Tour Distributor
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Company Name / Alias"
              name="company"
              value={formData.company}
              onChange={handleChange}
              fullWidth
              required
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Account
            </Button>
          </Box>

          <Typography
            variant="body2"
            textAlign="center"
            color="text.secondary"
            mt={3}
          >
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#1976d2" }}>
              Log in
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUp;
