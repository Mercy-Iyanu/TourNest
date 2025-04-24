import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TourPackageTable = () => {
  const navigate = useNavigate();
  const [tourPackages, setTourPackages] = useState([]);

  useEffect(() => {
    const storedPackages = JSON.parse(localStorage.getItem("tourPackages")) || [];
    setTourPackages(storedPackages);
  }, []);

  const handleDelete = (id) => {
    const updatedPackages = tourPackages.filter(pkg => pkg.id !== id);
    localStorage.setItem("tourPackages", JSON.stringify(updatedPackages));
    setTourPackages(updatedPackages);
  };

  const handleRowClick = (id) => {
    navigate(`/package/${id}`)
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">My Tour Packages</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-blue-900">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Location</th>
            <th className="p-2 text-left">Duration (days)</th>
            <th className="p-2 text-left">Price</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tourPackages.length === 0 ? (
            <tr><td colSpan="6" className="p-4 text-center">No packages found.</td></tr>
          ) : (
            tourPackages.map(pkg => (
              <tr 
                key={pkg.id} 
                className="border-t cursor-pointer hover:bg-gray-200" 
                onClick={() => handleRowClick(pkg.id.toString())}
              >
                <td className="p-2">{pkg.name}</td>
                <td className="p-2">{pkg.location}</td>
                <td className="p-2">{pkg.duration}</td>
                <td className="p-2">{pkg.price}</td>
                <td className="p-2">{pkg.status}</td>
                <td className="p-2 flex gap-2" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => navigate(`/edit-package/${pkg.id}`)} className="text-blue-800"><FaEdit /></button>
                  <button onClick={() => handleDelete(pkg.id)} className="text-red-400"><FaTrash /></button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TourPackageTable;