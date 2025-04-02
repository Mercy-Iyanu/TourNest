import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TourOwnerDashboard = () => {
  const navigate = useNavigate();
  const [tourPackages, setTourPackages] = useState([
    { id: 1, name: "Paris Tour", location: "France", duration: "5 Days", price: "$2000", status: "Active" },
    { id: 2, name: "New York City Tour", location: "USA", duration: "3 Days", price: "$1500", status: "Inactive" },
    { id: 3, name: "Tokyo Adventure", location: "Japan", duration: "7 Days", price: "$2500", status: "Active" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTours, setSelectedTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // Handle search input
  const filteredTours = tourPackages.filter((tour) =>
    tour.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTours = filteredTours.slice(indexOfFirstItem, indexOfLastItem);

  // Handle delete action
  const handleDelete = (id) => {
    setTourPackages(tourPackages.filter((tour) => tour.id !== id));
  };

  const handleCreatePackage = () => {
    navigate('create-package');
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    setTourPackages(tourPackages.filter((tour) => !selectedTours.includes(tour.id)));
    setSelectedTours([]);
  };

  // Handle selecting tours
  const toggleSelection = (id) => {
    setSelectedTours((prev) =>
      prev.includes(id) ? prev.filter((tourId) => tourId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedTours.length === currentTours.length) {
      setSelectedTours([]);
    } else {
      setSelectedTours(currentTours.map((tour) => tour.id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Create Tour Package Button */}
      <div className="mt-6 flex justify-end">
        <button 
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          onClick={handleCreatePackage}
        >
          Create Tour Package
        </button>
      </div>

      {/* Search and Bulk Delete */}
      <div className="mt-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search tours..."
          className="p-2 border rounded-lg w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {selectedTours.length > 0 && (
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            onClick={handleBulkDelete}
          >
            Delete Selected
          </button>
        )}
      </div>

      {/* Tour Packages Table */}
      <div className="mt-4 bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-center"><input type="checkbox" onChange={toggleSelectAll} /></th>
              <th className="p-3">S/N</th>
              <th className="p-3">Tour Name</th>
              <th className="p-3">Location</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTours.map((tour, index) => (
              <tr key={tour.id} className="border-b">
                <td className="p-3 text-center">
                  <input
                    type="checkbox"
                    checked={selectedTours.includes(tour.id)}
                    onChange={() => toggleSelection(tour.id)}
                  />
                </td>
                <td className="p-3">{indexOfFirstItem + index + 1}</td>
                <td className="p-3">{tour.name}</td>
                <td className="p-3">{tour.location}</td>
                <td className="p-3">{tour.duration}</td>
                <td className="p-3">{tour.price}</td>
                <td className="p-3 text-green-600 font-semibold">{tour.status}</td>
                <td className="p-3 flex space-x-4">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(tour.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center space-x-2">
        {[...Array(Math.ceil(filteredTours.length / itemsPerPage))].map((_, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-lg ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TourOwnerDashboard;
