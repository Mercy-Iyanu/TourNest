import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
  TextField,
  Divider,
} from "@mui/material";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRoleChange = (_, newRole) => {
    setUserRole(newRole);
    setError("");
  };

  const handleLogin = async () => {
    if (!email || !password || !userRole) {
      setError("Please fill all fields and select your user role.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: userRole }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed.");
      }

      localStorage.setItem("authUser", JSON.stringify(data.user));
      localStorage.setItem("userRole", userRole);
      onLogin(true);

      const destination =
        userRole === "tour-owner"
          ? "/owner-dashboard"
          : "/distributor-dashboard";
      navigate(destination);
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
      <Card sx={{ maxWidth: 400, width: "100%", boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
          >
            Welcome Back
          </Typography>
          <Typography variant="body2" textAlign="center" color="text.secondary">
            Join 400+ tour owners and distributors to create enjoyable tourist
            experiences!
          </Typography>

          <Divider sx={{ my: 3 }} />

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
              value={userRole}
              exclusive
              onChange={handleRoleChange}
              color="primary"
              fullWidth
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

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Box textAlign="right">
              <Link
                to="/forgot-password"
                style={{ fontSize: 14, color: "#1976d2" }}
              >
                Forgot Password?
              </Link>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              Sign In
            </Button>
          </Box>

          <Typography
            variant="body2"
            textAlign="center"
            color="text.secondary"
            mt={3}
          >
            Don’t have an account?{" "}
            <Link to="/signup" style={{ color: "#1976d2" }}>
              Sign up
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
