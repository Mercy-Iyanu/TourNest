import React from "react";
import {
  Typography,
  Button,
  IconButton,
  Box,
  Stack,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const AdditionalFilesUploader = ({ files, setFiles }) => {
  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <Box border={2} borderColor="#1D777D" borderRadius={2} p={3}>
      <Typography variant="subtitle1" color="text.primary" mb={2}>
        Additional Files (PDFs, Brochures, etc.){" "}
        <span style={{ color: "red" }}>*</span>
      </Typography>

      <Box mb={2}>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.ppt,.pptx"
          multiple
          onChange={handleFileUpload}
          id="file-upload"
          hidden
        />
        <label htmlFor="file-upload">
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
            Upload Files
          </Button>
        </label>
      </Box>

      {files.length > 0 && (
        <Stack spacing={1} mt={2}>
          {files.map((file, index) => (
            <Paper
              key={index}
              elevation={1}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 1,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <InsertDriveFileIcon sx={{ color: "gray" }} />
                <Typography variant="body2">{file.name}</Typography>
              </Box>
              <IconButton
                size="small"
                onClick={() => handleRemoveFile(index)}
                sx={{ color: "red" }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default AdditionalFilesUploader;
