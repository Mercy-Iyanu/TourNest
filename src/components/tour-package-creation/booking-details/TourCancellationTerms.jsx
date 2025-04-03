import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Typography } from "@mui/material";

const TourCancellationTerms = () => {
  const [cancellationPolicy, setCancellationPolicy] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      ["link", "image", "video"],
      ["blockquote", "code-block"],
      [{ script: "sub" }, { script: "super" }],
      [{ color: [] }, { background: [] }],
      ["table"],
    ],
  };

  return (
    <Box className="mb-4 md:mb-8">
      <Typography className="text-base md:text-sm text-gray-800">
        Cancellation Policy <span className="text-red-500">*</span>
      </Typography>

      <ReactQuill
        value={cancellationPolicy}
        onChange={setCancellationPolicy}
        modules={modules}
        placeholder="Enter cancellation policy..."
        className="bg-white h-[200px] rounded-md border border-gray-300 focus:ring-2 focus:ring-[#1D777D] focus:outline-none"
      />
    </Box>
  );
};

export default TourCancellationTerms;