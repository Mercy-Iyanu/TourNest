import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TourInventoryPage from './pages/TourInventory';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<TourTable />} /> */}
        <Route path="/" element={<TourInventoryPage />} />
        {/* <Route path="/tour/:tour_id" element={<TourDetails />} /> */}
      </Routes>
    </Router>
  );
}

export default App;