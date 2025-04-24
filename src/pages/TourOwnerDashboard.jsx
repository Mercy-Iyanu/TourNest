import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TourPackageTable from "../components/tour-package-creation/TourPackageTable";

const TourOwnerDashboard = () => {
  const navigate = useNavigate();

  const handleCreatePackage = () => {
    navigate('create-package');
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="mt-6 flex justify-end">
        <button 
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          onClick={handleCreatePackage}
        >
          Create Tour Package
        </button>
      </div>
      <TourPackageTable />
    </div>
  );
};

export default TourOwnerDashboard;
