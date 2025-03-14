import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import TourInventoryPage from './pages/TourInventory';
import Login from './components/auth/Login';
import Layout from './components/shared/Layout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        {isAuthenticated ? (
          <Route path='/' element={<Layout />}>
            <Route index element={<TourInventoryPage />} />
          </Route>
        ):(
          <Route path='*' element={<Navigate to='/login' replace/>} />
        )}
      </Routes>
    </Router>
  );
}

export default App;