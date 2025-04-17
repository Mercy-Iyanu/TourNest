import React, { useState } from "react";
import { Chip, Typography, TextField } from "@mui/material";

const TourTags = ({ selectedTags, setSelectedTags }) => {
  const availableTags = [
    "Adventure", "Luxury", "Family", "Hiking", "Beach", "Wildlife", "Cultural", "Historical", "Nature",
    "City Tour", "Safari", "Road Trip", "Cruise", "Eco-Tour", "Island Hopping", "Backpacking", "Winter Getaway",
    "Skiing", "Snorkeling", "Diving", "Photography", "Camping", "Trekking", "Desert Safari", "Food & Culinary",
    "Festival Tour", "Religious Tour", "Wellness & Spa", "Honeymoon", "Solo Travel", "Group Travel", "Business Travel",
    "Music & Concert", "Helicopter Tour", "National Parks", "Waterfalls", "Sunset Tour", "Extreme Sports", "Glacier Expedition",
    "Cave Exploration", "Jungle Safari", "Wine Tasting", "Bird Watching", "Volcano Tour", "Fishing", "Rock Climbing",
    "Motorcycle Tour", "Train Journey", "Nightlife Tour", "Urban Exploration", "Hot Air Balloon Ride"
  ];
  const [inputValue, setInputValue] = useState("");

  const toggleTag = (tag) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(updatedTags);
  };

  const handleAddTag = (event) => {
    if (event.key === "Enter" && inputValue.trim()) {
      event.preventDefault();
      if (!selectedTags.includes(inputValue.trim())) {
        setSelectedTags([...selectedTags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  return (
    <div className="mb-4 md:mb-8 space-y-4">
      <Typography className="text-base md:text-sm text-gray-800">
        Tour Tags <span className="text-red-500">*</span>
      </Typography>

      <TextField
        label="Add a tag"
        variant="outlined"
        fullWidth
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleAddTag}
        placeholder="Type a tag and press Enter"
        className="bg-white"
      />

      <div className="flex flex-wrap gap-2">
        {selectedTags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() => toggleTag(tag)}
            className="bg-teal-600 text-white"
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {availableTags.map((tag) => (
          <button
            key={tag}
            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
              selectedTags.includes(tag)
                ? "bg-[#1D777D] text-white border-[#1D777D]"
                : "bg-white text-gray-800 border-gray-400 hover:bg-gray-200"
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