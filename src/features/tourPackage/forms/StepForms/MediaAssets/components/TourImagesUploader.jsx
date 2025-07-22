import React from "react";
import {
  Typography,
  Button,
  IconButton,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

const TourImagesUploader = ({ images, setImages }) => {
  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    const uploadedImages = [];

    for (const file of files) {
      const uploaded = await uploadToCloudinary(file);
      uploadedImages.push({ url: uploaded.url, public_id: uploaded.public_id });
    }

    const newImages = [...images, ...uploadedImages];
    setImages(newImages);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <Box border={2} borderColor="#1D777D" borderRadius={2} p={3}>
      <Typography variant="subtitle1" color="text.primary" mb={2}>
        Tour Images <span style={{ color: "red" }}>*</span>
      </Typography>

      <Box mb={2}>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          id="image-upload"
          hidden
        />
        <label htmlFor="image-upload">
          <Button
            variant="contained"
            component="span"
            sx={{
              backgroundColor: "#1D777D",
              "&:hover": {
                backgroundColor: "#155f62",
              },
              color: "#fff",
              textTransform: "none",
            }}
          >
            Upload Images
          </Button>
        </label>
      </Box>

      {images.length > 0 && (
        <Grid container spacing={2}>
          {images.map((image, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Paper
                elevation={2}
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 2,
                  height: 120,
                }}
              >
                <img
                  src={image.url}
                  alt={`tour-img-${index}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleRemoveImage(index)}
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    backgroundColor: "rgba(0,0,0,0.6)",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "red",
                    },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TourImagesUploader;
