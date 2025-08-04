import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./features/auth/Login";
import Layout from "./layout/Layout";
import SignUp from "./features/auth/Signup";
import TourOwnerDashboard from "./features/dashboard/pages/TourOwnerDashboard";
import TourDistributorDashboard from "./features/dashboard/pages/TourDistributorDashboard";
import TourPackageForm from "./features/tourPackage/form/TourPackageForm";
import TourPackageSummary from "./features/tourPackage/pages/PackageSummaryPreview";
import DistributorPricingForm from "./features/pricing/components/DistributorPricingForm";
import OwnerPricingForm from "./features/pricing/components/OwnerPricingForm";
import ForgotPassword from "./features/auth/ForgotPassword";
import ResetPassword from "./features/auth/ResetPassword";
import TourBookingPage from "./features/bookings/pages/TourBookingPage";
import TourOwnerManageBookingTable from "./features/bookings/components/TourOwnerManageBookingTable";
import PaymentSuccess from "./features/payments/pages/PaymentSuccess";

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
            <Route path="/owner-dashboard" element={<TourOwnerDashboard />} />
            <Route
              path="/manage-booking"
              element={<TourOwnerManageBookingTable />}
            />
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
