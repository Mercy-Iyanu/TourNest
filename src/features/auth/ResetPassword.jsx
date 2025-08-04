import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Alert,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const token = params.get("token");
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!password || password !== confirm) {
      setMessage("Passwords must match and not be empty");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/users/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, password }),
        }
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Reset failed");
      setMessage("Password reset successful. Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="max-w-md w-full shadow-xl">
        <CardContent>
          <Typography variant="h5" className="font-bold text-center mb-4">
            Set New Password
          </Typography>
          {message && (
            <Alert severity="info" className="mb-4">
              {message}
            </Alert>
          )}
          <TextField
            label="New Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-3"
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="mb-3"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleReset}
          >
            Reset Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
