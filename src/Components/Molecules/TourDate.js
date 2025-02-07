import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaCalendarAlt } from "react-icons/fa";

const TourDate = ({ label }) => {
  const [date, setDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    setShowCalendar(false);
  };

  return (
    <div className="max-w-sm">
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <div
          onClick={toggleCalendar}
          className="flex items-center border border-gray-300 rounded-lg px-3 py-2 cursor-pointer text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1D777D]"
        >
          <FaCalendarAlt className="text-gray-500 mr-2" />
          <span>
            {date ? date.toLocaleDateString("en-GB") : "DD/MMM/YYYY"}
          </span>
        </div>

        {showCalendar && (
          <div className="absolute z-10 mt-2">
            <Calendar onChange={handleDateChange} value={date} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TourDate;