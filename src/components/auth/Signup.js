import React, { useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { auth } from "../../utils/firebase";

const SignUp = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  
  const handleChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      localStorage.setItem("authUser", JSON.stringify(result.user));
      navigate("/");
    } catch (error) {
      console.error("Google sign-up error:", error);
    }
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
          <Typography variant="h5" className="font-bold text-center">
            Get Started
          </Typography>

          <Typography variant="body2" className="text-gray-600 text-center">
            Select your role
          </Typography>
          <ToggleButtonGroup
            value={role}
            exclusive
            onChange={(e, newRole) => setRole(newRole)}
            className="flex justify-center w-full mb-8"
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
                  className="w-full py-2 flex items-center gap-2"
                >
                  <FaGoogle className="text-lg" /> Sign up with Google
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className="w-full py-2 flex items-center gap-2"
                >
                  <FaFacebook className="text-lg" /> Sign up with Facebook
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;