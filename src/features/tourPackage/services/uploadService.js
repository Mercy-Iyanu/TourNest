import axios from "./api";
import { toast } from "react-toastify";

export const uploadMedia = async (files) => {
  const urls = [];
  for (let file of files) {
    const toastId = toast.loading(`Uploading ${file.name}...`);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.update(toastId, {
        render: `${file.name} uploaded successfully`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      urls.push(res.data.url);
    } catch (err) {
      toast.update(toastId, {
        render: `Upload failed: ${file.name}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      throw err;
    }
  }
  return urls;
};
