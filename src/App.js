import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import TourInventoryPage from './pages/TourInventory';
import Login from './components/auth/Login';
import Layout from './components/shared/Layout';
import SignUp from './components/auth/Signup';
import TourOwnerDashboard from './pages/TourOwnerDashboard';
import TourDistributorDashboard from './pages/TourDistributorDashboard';
import ParentTourPackageForm from './components/tour-package-creation/ParentTourPackageForm';
import TourPackageSummary from './pages/PackageSummaryPreview';
import PricingRuleForm from './components/ui/PricingRuleForm';
import PricingRulePage from './components/ui/PricingRulePage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
          <Route path='/signup' element={<SignUp />}/>
        {isAuthenticated ? (
          <Route path='/' element={<Layout />}>
            <Route index element={<TourInventoryPage />} />
            <Route path="/owner-dashboard" element={<TourOwnerDashboard />} />
            <Route path="/distributor-dashboard" element={<TourDistributorDashboard />} />
            <Route path="/pricing-rule-page" element={<PricingRulePage />} />
            <Route path="/pricing-rule-form" element={<PricingRuleForm />} />
            <Route path="/package/:id" element={<TourPackageSummary />} />
            <Route path="/owner-dashboard/create-package" element={<ParentTourPackageForm />} />
          </Route>
        ):(
          <Route path='*' element={<Navigate to='/login' replace/>} />
        )}
      </Routes>
    </Router>
  );
}

export default App;