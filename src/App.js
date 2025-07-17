import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import TourInventoryPage from "./pages/TourInventory";
import Login from "../src/features/auth/Login";
import Layout from "./components/layout/Layout";
import SignUp from "./features/auth/Signup";
import TourOwnerDashboard from "./pages/TourOwnerDashboard";
import TourDistributorDashboard from "./pages/TourDistributorDashboard";
import ParentTourPackageForm from "./features/tourPackage/forms/ParentTourPackageForm";
import TourPackageSummary from "./features/tourPackage/pages/PackageSummaryPreview";
import DistributorPricingForm from "./features/pricingRules/distributor/form/DistributorPricingForm";
import OwnerPricingForm from "./features/pricingRules/owner/form/OwnerPricingForm";
import ForgotPassword from "./features/auth/pages/ForgotPassword";
import ResetPassword from "./features/auth/pages/ResetPassword";
import TourBookingPage from "./features/manageBooking/pages/TourBookingPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={() => setIsAuthenticated(true)} />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/signup" element={<SignUp />} />
        {isAuthenticated ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<TourInventoryPage />} />
            <Route path="/owner-dashboard" element={<TourOwnerDashboard />} />
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
            <Route path="/package/:id" element={<TourPackageSummary />} />
            <Route path="/create-package" element={<ParentTourPackageForm />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
