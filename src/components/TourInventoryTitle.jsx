import React from 'react';
import Button from '../Atoms/Button';

const TourInventoryTitle = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Tour Inventory</h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage and view all the available tours in your inventory. Add, edit, or remove tours as needed to keep the catalog up to date.
        </p>
      </div>

      <Button text="Add New Tour" onClick={() => alert('Add New Tour clicked!')} />
    </div>
  );
};

export default TourInventoryTitle;