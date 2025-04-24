import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import TourInventoryPage from './pages/TourInventory';
import Login from './components/auth/Login';
import Layout from './components/shared/Layout';
import SignUp from './components/auth/Signup';
import TourOwnerDashboard from './pages/TourOwnerDashboard';
import ParentTourPackageForm from './components/tour-package-creation/ParentTourPackageForm';
import TourPackageSummary from './pages/PackageSummaryPreview';

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
            <Route path="/" element={<TourOwnerDashboard />} />
            <Route path="/package/:id" element={<TourPackageSummary />} />
            <Route path="/create-package" element={<ParentTourPackageForm />} />
          </Route>
        ):(
          <Route path='*' element={<Navigate to='/login' replace/>} />
        )}
      </Routes>
    </Router>
  );
}

export default App;