import React from 'react';

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`rounded-2xl shadow-md bg-white border border-gray-200 ${className}`}>
      {children}
    </div>
  );
};
