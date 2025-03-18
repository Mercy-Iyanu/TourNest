import React, { useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-xl rounded-lg w-full max-w-md">
        <h2 className="text-2xl mb-4 font-semibold text-center">Get Started</h2>

        <div className="flex justify-between mb-4">
          <button
            onClick={() => setRole("Tour Owner")}
            className={`px-4 py-2 rounded-lg ${
              role === "Tour Owner" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Tour Owner
          </button>
          <button
            onClick={() => setRole("Tour Distributor")}
            className={`px-4 py-2 rounded-lg ${
              role === "Tour Distributor" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Tour Distributor
          </button>
        </div>

        {role && (
          <>
            <button
              onClick={handleGoogleSignUp}
              className="flex items-center justify-center w-full bg-red-600 text-white py-2 rounded-lg mb-3"
            >
              <FaGoogle className="mr-2" /> Sign up with Google
            </button>
            <button
              className="flex items-center justify-center w-full bg-blue-700 text-white py-2 rounded-lg mb-3"
            >
              <FaFacebook className="mr-2" /> Sign up with Facebook
            </button>

            <div className="text-center text-gray-500 mb-3">OR</div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
              >
                Sign Up
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUp;
