import React, { useState } from "react";
import { Typography, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TourVideosUploader = ({ videos, setVideos }) => {
  const handleVideoUpload = (event) => {
    const files = event.target.files;
    if (files) {
      const newVideos = [...videos, ...Array.from(files)];
      setVideos(newVideos);
    }
  };

  // Remove video from the list
  const handleRemoveVideo = (index) => {
    const updatedVideos = videos.filter((_, i) => i !== index);
    setVideos(updatedVideos);
  };

  return (
    <div className="p-4 md:p-6 border-2 border-[#1D777D] rounded-lg">
      <Typography className="text-base md:text-sm text-gray-800">
        Tour Videos <span className="text-red-500">*</span>
      </Typography>

      <div className="mb-4">
        <input
          type="file"
          accept="video/*"
          multiple
          onChange={handleVideoUpload}
          className="hidden"
          id="video-upload"
        />
        <label htmlFor="video-upload">
          <Button variant="contained" component="span" className="bg-teal-600 hover:bg-teal-700 text-white">
            Upload Videos
          </Button>
        </label>
      </div>

      {videos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {videos.map((video, index) => (
            <div key={index} className="relative border rounded-lg overflow-hidden">
              <video 
                src={URL.createObjectURL(video)} 
                controls 
                className="w-full h-32 object-cover" 
              />
              <IconButton
                size="small"
                className="absolute top-1 right-1 bg-gray-800 text-white hover:bg-red-600"
                onClick={() => handleRemoveVideo(index)}
              >
                <DeleteIcon fontSize="small" className="text-red-600" />
              </IconButton>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TourVideosUploader;
