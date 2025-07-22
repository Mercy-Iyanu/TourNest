import React, { useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import TourImagesUploader from "./components/TourImagesUploader";
import TourVideosUploader from "./components/TourVideosUploader";
import AdditionalFilesUploader from "./components/AdditionalFilesUploader";

const MediaAssetsForm = ({ formData, setFormData }) => {
  const [tourImages, setTourImages] = useState(
    formData?.media?.tourImages || []
  );
  const [tourVideos, setTourVideos] = useState(
    formData?.media?.tourVideos || []
  );
  const [additionalFiles, setAdditionalFiles] = useState(
    formData?.media?.additionalFiles || []
  );

  const updateMedia = (newImages, newVideos, newFiles) => {
    setFormData((prev) => ({
      ...prev,
      media: {
        ...prev.media,
        tourImages: newImages,
        tourVideos: newVideos,
        additionalFiles: newFiles,
      },
    }));
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Stack spacing={4}>
          <TourImagesUploader
            images={tourImages}
            setImages={(newImages) => {
              setTourImages(newImages);
              updateMedia(newImages, tourVideos, additionalFiles);
            }}
          />
          <TourVideosUploader
            videos={tourVideos}
            setVideos={(newVideos) => {
              setTourVideos(newVideos);
              updateMedia(tourImages, newVideos, additionalFiles);
            }}
          />
          <AdditionalFilesUploader
            files={additionalFiles}
            setFiles={(newFiles) => {
              setAdditionalFiles(newFiles);
              updateMedia(tourImages, tourVideos, newFiles);
            }}
          />
        </Stack>
      </Box>
    </Container>
  );
};

export default MediaAssetsForm;
