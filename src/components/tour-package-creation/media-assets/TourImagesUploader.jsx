import React, { useState } from "react";
import { Typography, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TourImagesUploader = () => {
  const [images, setImages] = useState([]);

  // Handle image selection
  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files) {
      const newImages = [...images, ...Array.from(files).map((file) => URL.createObjectURL(file))];
      setImages(newImages);
    }
  };

  // Remove image from the list
  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <div className="p-4 md:p-6 border-2 border-[#1D777D] rounded-lg">
      <Typography className="text-base md:text-sm text-gray-800">
        Tour Images <span className="text-red-500">*</span>
      </Typography>

      {/* Upload Button */}
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button variant="contained" component="span" className="bg-teal-600 hover:bg-teal-700 text-white">
            Upload Images
          </Button>
        </label>
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {images.map((image, index) => (
            <div key={index} className="relative border rounded-lg overflow-hidden">
              <img src={image} alt={`tour-img-${index}`} className="w-full h-32 object-cover" />
              <IconButton
                size="small"
                className="absolute top-1 right-1 bg-gray-800 text-white hover:bg-red-600"
                onClick={() => handleRemoveImage(index)}
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

export default TourImagesUploader;
