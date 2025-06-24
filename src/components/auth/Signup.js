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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="shadow-xl max-w-md w-full p-6">
        <CardContent>
          <Typography variant="h5" className="font-bold text-center mb-2">
            Get Started
          </Typography>
          <Typography
            variant="body2"
            className="text-center text-gray-600 mb-4"
          >
            Fill in your details to create an account
          </Typography>

          <Typography variant="body2" className="text-gray-600 text-center">
            Select your role
          </Typography>
          <ToggleButtonGroup
            value={role}
            exclusive
            onChange={(e, newRole) => setRole(newRole)}
            className="flex justify-center w-full mb-4"
          >
            <ToggleButton value="tour-owner">Tour Owner</ToggleButton>
            <ToggleButton value="tour-distributor">
              Tour Distributor
            </ToggleButton>
          </ToggleButtonGroup>

          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
          </form>
          <Typography
            variant="body2"
            className="text-center text-gray-500 mt-4"
          >
            Already have an account{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
