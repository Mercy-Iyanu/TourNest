import React, { useState } from "react";
import { Chip, Typography, TextField, Box, Button } from "@mui/material";

const TourTags = ({ selectedTags, setSelectedTags }) => {
  const availableTags = [
    "Adventure",
    "Luxury",
    "Family",
    "Hiking",
    "Beach",
    "Wildlife",
    "Cultural",
    "Historical",
    "Nature",
    "City Tour",
    "Safari",
    "Road Trip",
    "Cruise",
    "Eco-Tour",
    "Island Hopping",
    "Backpacking",
    "Winter Getaway",
    "Skiing",
    "Snorkeling",
    "Diving",
    "Photography",
    "Camping",
    "Trekking",
    "Desert Safari",
    "Food & Culinary",
    "Festival Tour",
    "Religious Tour",
    "Wellness & Spa",
    "Honeymoon",
    "Solo Travel",
    "Group Travel",
    "Business Travel",
    "Music & Concert",
    "Helicopter Tour",
    "National Parks",
    "Waterfalls",
    "Sunset Tour",
    "Extreme Sports",
    "Glacier Expedition",
    "Cave Exploration",
    "Jungle Safari",
    "Wine Tasting",
    "Bird Watching",
    "Volcano Tour",
    "Fishing",
    "Rock Climbing",
    "Motorcycle Tour",
    "Train Journey",
    "Nightlife Tour",
    "Urban Exploration",
    "Hot Air Balloon Ride",
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
      const tag = inputValue.trim();
      if (!selectedTags.includes(tag)) {
        setSelectedTags([...selectedTags, tag]);
      }
      setInputValue("");
    }
  };

  return (
    <Box sx={{ mb: { xs: 3, md: 6 } }}>
      <Typography variant="subtitle1" gutterBottom>
        Tour Tags{" "}
        <Typography component="span" color="error">
          *
        </Typography>
      </Typography>

      <TextField
        label="Add a tag"
        variant="outlined"
        fullWidth
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleAddTag}
        placeholder="Type a tag and press Enter"
        sx={{ mt: 2 }}
      />

      {selectedTags.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
          {selectedTags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => toggleTag(tag)}
              sx={{
                backgroundColor: "#1D777D",
                color: "#fff",
                "& .MuiChip-deleteIcon": { color: "#fff" },
              }}
            />
          ))}
        </Box>
      )}

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 3 }}>
        {availableTags.map((tag) => (
          <Button
            key={tag}
            variant={selectedTags.includes(tag) ? "contained" : "outlined"}
            onClick={() => toggleTag(tag)}
            sx={{
              textTransform: "none",
              fontSize: 13,
              borderRadius: 2,
              px: 2,
              py: 1,
              backgroundColor: selectedTags.includes(tag) ? "#1D777D" : "#fff",
              borderColor: selectedTags.includes(tag) ? "#1D777D" : "grey.400",
              color: selectedTags.includes(tag) ? "#fff" : "text.primary",
              "&:hover": {
                backgroundColor: selectedTags.includes(tag)
                  ? "#155e5f"
                  : "grey.100",
              },
            }}
          >
            {tag}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default TourTags;
