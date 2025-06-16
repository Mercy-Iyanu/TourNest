import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_URL =
  "https://sabre-tour-aggregator-backend-production.up.railway.app/api/packages";

const TourPackageTable = () => {
  const navigate = useNavigate();
  const [tourPackages, setTourPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const formattedPackages = data.map((pkg) => ({
          id: pkg._id,
          name: pkg.basicInfo.tour_name,
          location: `${pkg.basicInfo.city}, ${pkg.basicInfo.state}, ${pkg.basicInfo.country}`,
          duration: pkg.basicInfo.duration || "N/A",
          price: `$${pkg.pricing.pricePerPerson?.toLocaleString()} ${
            pkg.pricing.currency || ""
          }`,
          status: pkg.pricing.availability?.[0]?.is_available
            ? "active"
            : "inactive",
        }));

        setTourPackages(formattedPackages);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  const handleDelete = (id) => {
    const updatedPackages = tourPackages.filter((pkg) => pkg.id !== id);
    localStorage.setItem("tourPackages", JSON.stringify(updatedPackages));
    setTourPackages(updatedPackages);
  };

  const handleRowClick = (id) => {
    navigate(`/package/${id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        My Tour Packages
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead>
            <tr className="bg-gray-50 text-gray-700 uppercase tracking-wider">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tourPackages.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No packages found.
                </td>
              </tr>
            ) : (
              tourPackages.map((pkg) => (
                <tr
                  key={pkg.id}
                  className="border-t hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => handleRowClick(pkg.id.toString())}
                >
                  <td className="px-4 py-3">{pkg.name}</td>
                  <td className="px-4 py-3">{pkg.location}</td>
                  <td className="px-4 py-3">{pkg.duration} days</td>
                  <td className="px-4 py-3">{pkg.price}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        pkg.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {pkg.status}
                    </span>
                  </td>
                  <td
                    className="px-4 py-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex space-x-4 text-lg">
                      <button
                        onClick={() => navigate(`/edit-package/${pkg.id}`)}
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(pkg.id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TourPackageTable;
