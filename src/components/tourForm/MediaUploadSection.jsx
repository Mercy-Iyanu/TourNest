import React from "react";
import { Button, Typography, Stack } from "@mui/material";
import { useFormikContext } from "formik";

const MediaUploadSection = ({ handleMediaUpload }) => {
  const { setFieldValue } = useFormikContext();

  return (
    <>
      <Typography variant="h6" mt={4}>
        Media Uploads
      </Typography>
      <Stack spacing={2}>
        <Button variant="outlined" component="label">
          Upload Tour Images
          <input
            hidden
            multiple
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleMediaUpload(e, "media.tourImages", setFieldValue)
            }
          />
        </Button>
        <Button variant="outlined" component="label">
          Upload Tour Videos
          <input
            hidden
            multiple
            type="file"
            accept="video/*"
            onChange={(e) =>
              handleMediaUpload(e, "media.tourVideos", setFieldValue)
            }
          />
        </Button>
        <Button variant="outlined" component="label">
          Upload Additional Files
          <input
            hidden
            multiple
            type="file"
            accept=".pdf,.docx"
            onChange={(e) =>
              handleMediaUpload(e, "media.additionalFiles", setFieldValue)
            }
          />
        </Button>
      </Stack>
    </>
  );
};

export default MediaUploadSection;
