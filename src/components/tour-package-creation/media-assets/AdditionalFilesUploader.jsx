import React from "react";
import { Typography, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const AdditionalFilesUploader = ({ files, setFiles }) => {
  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  return (
    <div className="p-4 md:p-6 border-2 border-[#1D777D] rounded-lg">
      <Typography className="text-base md:text-sm text-gray-800">
        Additional Files (PDFs, Brochures, etc.) <span className="text-red-500">*</span>
      </Typography>

      <div className="mb-4">
        <input
          type="file"
          accept=".pdf,.doc,.docx,.ppt,.pptx"
          multiple
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button variant="contained" component="span" className="bg-teal-600 hover:bg-teal-700 text-white">
            Upload Files
          </Button>
        </label>
      </div>

      {files.length > 0 && (
        <div className="space-y-2 mt-4">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 border rounded-md bg-gray-100">
              <div className="flex items-center space-x-2">
                <InsertDriveFileIcon className="text-gray-600" />
                <Typography className="text-sm text-gray-800">{file.name}</Typography>
              </div>
              <IconButton size="small" onClick={() => handleRemoveFile(index)} className="text-red-600">
                <DeleteIcon fontSize="small" className="text-red-600" />
              </IconButton>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdditionalFilesUploader;