import React from 'react';

const Button = ({ text, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#1D777D] text-white px-4 py-2 rounded-lg hover:bg-[#165c58] focus:outline-none ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;