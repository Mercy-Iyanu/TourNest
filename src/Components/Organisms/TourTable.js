import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Card } from '../Atoms/Card';
import { CardContent } from '../Atoms/CardContent';

const TourTable = ({ tours = [] }) => {
  return (
    <Card className="p-4 shadow-xl">
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border">S/N</th>
                <th className="px-4 py-2 border">Tour Name</th>
                <th className="px-4 py-2 border">Location</th>
                <th className="px-4 py-2 border">Duration</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour, index) => (
                <tr key={tour.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{tour.name}</td>
                  <td className="px-4 py-2 border">{tour.location}</td>
                  <td className="px-4 py-2 border">{tour.duration}</td>
                  <td className="px-4 py-2 border">${tour.price.toFixed(2)}</td>
                  <td className={`px-4 py-2 border ${tour.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>{tour.status}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TourTable;
