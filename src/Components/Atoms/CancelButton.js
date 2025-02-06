import React from 'react';

const CancelButton = ({ text, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#E50000] text-white px-4 py-2 rounded-lg hover:bg-[#E51000] focus:outline-none ${className}`}
    >
      {text}
    </button>
  );
};

export default CancelButton;