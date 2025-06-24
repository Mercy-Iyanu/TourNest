import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
  TextField,
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="shadow-xl max-w-md w-full p-6">
        <CardContent>
          <Typography variant="h4" className="font-bold text-center mb-2">
            Welcome Back
          </Typography>
          <Typography variant="body2" className="text-center text-gray-500">
            Join 400+ tour owners and distributors to create enjoyable tourist
            experiences!
          </Typography>

          <hr className="mt-4 mb-4" />

          <Typography variant="body2" className="text-gray-600 text-center">
            Select your role
          </Typography>
          <div className="flex justify-center mb-4">
            <ToggleButtonGroup
              value={userRole}
              exclusive
              onChange={handleRoleChange}
              color="primary"
            >
              <ToggleButton value="tour-owner">Tour Owner</ToggleButton>
              <ToggleButton value="tour-distributor">
                Tour Distributor
              </ToggleButton>
            </ToggleButtonGroup>
          </div>

          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}

          <div className="flex flex-col gap-4">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              Sign In
            </Button>
          </div>

          <Typography
            variant="body2"
            className="text-center text-gray-500 mt-4"
          >
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
