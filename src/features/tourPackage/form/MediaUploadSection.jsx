import React from "react";
import { Typography, Stack } from "@mui/material";
import { useFormikContext } from "formik";
import DropzoneField from "../services/DropzoneField";

const MediaUploadSection = ({ handleMediaUpload }) => {
  const { setFieldValue } = useFormikContext();

  return (
    <>
      <Typography variant="h6" mt={4}>
        Media Uploads
      </Typography>
      <Typography variant="body2" color="textSecondary">
        • Max file size: 5MB &nbsp;• Allowed types: JPG, MP4, PDF, DOCX &nbsp;•
        Max 10 files
      </Typography>
      <Stack spacing={2}>
        <DropzoneField
          label="Tour Images"
          fieldName="media.tourImages"
          acceptedTypes={["image/jpeg", "image/png", "image/webp"]}
          setFieldValue={setFieldValue}
          uploadHandler={handleMediaUpload}
        />
        <DropzoneField
          label="Tour Videos"
          fieldName="media.tourVideos"
          acceptedTypes={["video/mp4", "video/webm"]}
          setFieldValue={setFieldValue}
          uploadHandler={handleMediaUpload}
        />
        <DropzoneField
          label="Additional Files"
          fieldName="media.additionalFiles"
          acceptedTypes={[
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ]}
          setFieldValue={setFieldValue}
          uploadHandler={handleMediaUpload}
        />
      </Stack>
    </>
  );
};

export default MediaUploadSection;
