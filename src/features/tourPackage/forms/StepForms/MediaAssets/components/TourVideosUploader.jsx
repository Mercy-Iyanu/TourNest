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

const TourVideosUploader = ({ videos, setVideos }) => {
  const handleVideoUpload = async (event) => {
    const files = Array.from(event.target.files);
    const uploadedVideos = [];

    for (const file of files) {
      const uploaded = await uploadToCloudinary(file);
      uploadedVideos.push({ url: uploaded.url, public_id: uploaded.public_id });
    }

    const newVideos = [...videos, ...uploadedVideos];
    setVideos(newVideos);
  };

  const handleRemoveVideo = (index) => {
    const updatedVideos = videos.filter((_, i) => i !== index);
    setVideos(updatedVideos);
  };

  return (
    <Box border={2} borderColor="#1D777D" borderRadius={2} p={3}>
      <Typography variant="subtitle1" color="text.primary" mb={2}>
        Tour Videos <span style={{ color: "red" }}>*</span>
      </Typography>

      <Box mb={2}>
        <input
          type="file"
          accept="video/*"
          multiple
          onChange={handleVideoUpload}
          id="video-upload"
          hidden
        />
        <label htmlFor="video-upload">
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
            Upload Videos
          </Button>
        </label>
      </Box>

      {videos.length > 0 && (
        <Grid container spacing={2} mt={2}>
          {videos.map((video, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={2}
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 2,
                  height: 150,
                }}
              >
                <video
                  src={video.url}
                  controls
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleRemoveVideo(index)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
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

export default TourVideosUploader;
