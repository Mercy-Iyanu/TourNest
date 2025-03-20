import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import TourInventoryPage from './pages/TourInventory';
import Login from './components/auth/Login';
import Layout from './components/shared/Layout';
import SignUp from './components/auth/Signup';

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
          </Route>
        ):(
          <Route path='*' element={<Navigate to='/login' replace/>} />
        )}
      </Routes>
    </Router>
  );
}

export default App;