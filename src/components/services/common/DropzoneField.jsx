import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Typography,
  Stack,
  LinearProgress,
  IconButton,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = {
  images: ["image/jpeg", "image/png", "image/webp"],
  videos: ["video/mp4", "video/webm"],
  docs: [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
};

const DropzoneField = ({
  label,
  fieldName,
  acceptedTypes,
  setFieldValue,
  uploadHandler,
}) => {
  const [previewFiles, setPreviewFiles] = useState([]);
  const [progress, setProgress] = useState({});

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const validFiles = [];

      for (let file of acceptedFiles) {
        if (file.size > MAX_SIZE) {
          toast.error(`"${file.name}" exceeds 5MB.`);
          continue;
        }

        if (!acceptedTypes.includes(file.type)) {
          toast.error(`"${file.name}" is not a supported type.`);
          continue;
        }

        const alreadyExists = previewFiles.some(
          (f) =>
            f.name === file.name && f.size === file.size && f.type === file.type
        );
        if (alreadyExists) {
          toast.warn(`"${file.name}" is already added.`);
          continue;
        }
        validFiles.push(file);
      }

      if (!validFiles.length) return;

      setPreviewFiles((prev) => [...prev, ...validFiles]);

      try {
        const urls = await uploadHandler(validFiles, setProgress);
        setFieldValue(fieldName, urls);
        toast.success("Upload successful");
      } catch (err) {
        toast.error("Upload failed.");
        console.error(err);
      }
    },
    [acceptedTypes, fieldName, setFieldValue, uploadHandler, previewFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    multiple: true,
  });

  return (
    <Box sx={{ border: "1px dashed gray", p: 2, borderRadius: 2 }}>
      <Typography variant="subtitle1" mb={1}>
        {label}
      </Typography>
      <Box
        {...getRootProps()}
        sx={{
          p: 2,
          border: "2px dashed #ccc",
          borderRadius: 2,
          textAlign: "center",
          bgcolor: isDragActive ? "#f0f0f0" : "transparent",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <Typography>
          {isDragActive
            ? "Drop files here..."
            : "Drag and drop files or click to select"}
        </Typography>
      </Box>

      <Stack spacing={1} mt={2}>
        {previewFiles.map((file, idx) => (
          <Box
            key={idx}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            border="1px solid #ddd"
            borderRadius={1}
            p={1}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <InsertDriveFileIcon />
              <Typography>{file.name}</Typography>
            </Stack>
            <Box minWidth="30%">
              {progress[file.name] && (
                <LinearProgress
                  variant="determinate"
                  value={progress[file.name]}
                />
              )}
            </Box>
            <IconButton
              size="small"
              onClick={() => toast.info("Remove not yet implemented")}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default DropzoneField;
