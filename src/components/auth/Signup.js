import React, { useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, TextField, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";

const SignUp = () => {
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
      localStorage.setItem("authUser", JSON.stringify(result.user));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData, "Role:", role);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="shadow-xl max-w-md w-full p-6">
        <CardContent>
          <Typography variant="h4" className="font-bold text-center mb-4">
            Get Started
          </Typography>

          <ToggleButtonGroup
            value={role}
            exclusive
            onChange={(e, newRole) => setRole(newRole)}
            className="flex justify-center w-full mb-4"
          >
            <ToggleButton value="Tour Owner">Tour Owner</ToggleButton>
            <ToggleButton value="Tour Distributor">Tour Distributor</ToggleButton>
          </ToggleButtonGroup>

          {role && (
            <>
              <div className="space-y-4">
                <Button
                  onClick={handleGoogleSignUp}
                  variant="contained"
                  color="error"
                  className="w-full py-2 mb-6 flex items-center gap-2"
                >
                  <FaGoogle className="text-lg" /> Sign up with Google
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className="w-full py-2 mb-6 flex items-center gap-2"
                >
                  <FaFacebook className="text-lg" /> Sign up with Facebook
                </Button>
              </div>

              <Typography variant="body2" className="text-center text-gray-500 mb-6">
                OR
              </Typography>

              <form onSubmit={handleSubmit} className="space-y-3">
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
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Email Address"
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
                <Button type="submit" variant="contained" color="success" fullWidth>
                  Sign Up
                </Button>
              </form>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
