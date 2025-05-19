import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TourPackageTable from "../components/tour-package-creation/TourPackageTable";

const TourOwnerDashboard = () => {
  const navigate = useNavigate();

  const handleCreatePackage = () => {
    navigate('/create-package');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Tour Package Dashboard</h1>
          <button 
            onClick={handleCreatePackage}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-5 rounded-lg shadow-sm transition"
          >
            + Create Tour Package
          </button>
        </div>
        <TourPackageTable />
      </div>
    </div>
  );
};


export default TourOwnerDashboard;
