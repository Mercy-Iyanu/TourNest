import React, { useState } from "react";

const TourTags = ({ onTagsChange }) => {
  const availableTags = [
    "Adventure", "Luxury", "Family", "Hiking", "Beach", "Wildlife", "Cultural", "Historical", "Nature",
    "City Tour", "Safari", "Road Trip", "Cruise", "Eco-Tour", "Island Hopping", "Backpacking", "Winter Getaway",
    "Skiing", "Snorkeling", "Diving", "Photography", "Camping", "Trekking", "Desert Safari", "Food & Culinary",
    "Festival Tour", "Religious Tour", "Wellness & Spa", "Honeymoon", "Solo Travel", "Group Travel", "Business Travel",
    "Music & Concert", "Helicopter Tour", "National Parks", "Waterfalls", "Sunset Tour", "Extreme Sports", "Glacier Expedition",
    "Cave Exploration", "Jungle Safari", "Wine Tasting", "Bird Watching", "Volcano Tour", "Fishing", "Rock Climbing",
    "Motorcycle Tour", "Train Journey", "Nightlife Tour", "Urban Exploration", "Hot Air Balloon Ride"
  ];

  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(updatedTags);
    onTagsChange(updatedTags);
  };

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold mb-2">Tags related to the tour for easier search<span className="text-red-500">*</span></h3>
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <button
            key={tag}
            className={`px-4 py-2 text-sm font-medium rounded-lg border ${
              selectedTags.includes(tag)
                ? "bg-[#1D777D] text-white border-[#1D777D]"
                : "bg-white text-gray-800 border-gray-400"
            }`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TourTags;
