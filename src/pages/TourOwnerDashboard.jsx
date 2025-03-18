import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TourOwnerDashboard = () => {
  // Sample data for tour packages
  const [tourPackages, setTourPackages] = useState([
    { id: 1, title: "Paris Tour", description: "Explore the city of lights" },
    { id: 2, title: "New York City Tour", description: "The best of NYC" },
    { id: 3, title: "Tokyo Adventure", description: "Discover the vibrant culture of Tokyo" },
  ]);

  // Function to handle delete action
  const handleDelete = (id) => {
    setTourPackages(tourPackages.filter((tour) => tour.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Dashboard Header */}
      <div className="bg-blue-600 p-4 text-white text-center">
        <h1 className="text-2xl font-semibold">Tour Owner Dashboard</h1>
      </div>

      {/* Create Tour Package Button (Inactive) */}
      <div className="p-4 text-center">
        <button
          className="bg-gray-400 text-white py-2 px-4 rounded-lg"
        >
          Create Tour Package
        </button>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Recent Tour Packages</h2>
        <div className="bg-white shadow-md rounded-lg">
          <ul>
            {tourPackages.map((tour) => (
              <li key={tour.id} className="flex justify-between items-center p-4 border-b">
                <div>
                  <h3 className="text-lg font-semibold">{tour.title}</h3>
                  <p className="text-sm text-gray-600">{tour.description}</p>
                </div>
                <div className="flex space-x-4">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>

                  {/* Delete Button */}
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(tour.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TourOwnerDashboard;