// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Alert,
} from "@mui/material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/users/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send reset email");

      setMessage("Password reset instructions have been sent to your email.");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="max-w-md w-full shadow-xl">
        <CardContent>
          <Typography variant="h5" className="font-bold text-center mb-4">
            Reset Your Password
          </Typography>

          {message && (
            <Alert severity="info" className="mb-4">
              {message}
            </Alert>
          )}

          <TextField
            label="Email Address"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4"
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleReset}
          >
            Send Reset Link
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
