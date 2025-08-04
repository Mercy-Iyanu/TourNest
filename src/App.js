import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TourInventoryPage from "./pages/TourInventory";
import Login from "../src/features/auth/Login";
import Layout from "./components/layout/Layout";
import SignUp from "./features/auth/Signup";
import TourOwnerDashboard from "./pages/TourOwnerDashboard";
import TourDistributorDashboard from "./pages/TourDistributorDashboard";
import TourPackageForm from "./components/tourForm/TourPackageForm";
import TourPackageSummary from "./components/tourForm/PackageSummaryPreview";
import DistributorPricingForm from "./components/pricing/DistributorPricingForm";
import OwnerPricingForm from "./features/pricingRules/owner/form/OwnerPricingForm";
import ForgotPassword from "./features/auth/pages/ForgotPassword";
import ResetPassword from "./features/auth/pages/ResetPassword";
import TourBookingPage from "./components/bookings/TourBookingPage";
import TourOwnerBookingsPage from "./features/manageBooking/pages/TourOwnerManageBookingTable";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
        draggable
      />
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={() => setIsAuthenticated(true)} />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />

        {isAuthenticated ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<TourInventoryPage />} />
            <Route path="/owner-dashboard" element={<TourOwnerDashboard />} />
            <Route path="/manage-booking" element={<TourOwnerBookingsPage />} />
            <Route
              path="/distributor-dashboard"
              element={<TourDistributorDashboard />}
            />
            <Route path="/pricing-rule-page" element={<OwnerPricingForm />} />
            <Route
              path="/pricing-rule-form"
              element={<DistributorPricingForm />}
            />
            <Route path="/book/:tourId" element={<TourBookingPage />} />
            <Route
              path="/edit-package/:id"
              element={<TourPackageForm mode="edit" />}
            />
            <Route path="/package/:id" element={<TourPackageSummary />} />
            <Route path="/create-package" element={<TourPackageForm />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
