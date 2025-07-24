import axios from "../../../features/tourPackage/services/api";
import { toast } from "react-toastify";

export const uploadMedia = async (files, setProgress = () => {}) => {
  const urls = [];

  for (let file of files) {
    const formData = new FormData();
    formData.append("file", file);

    const toastId = toast.loading(`Uploading ${file.name}...`);

    try {
      const res = await axios.post("/api/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress((prev) => ({ ...prev, [file.name]: percent }));
        },
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

      urls.push(res.data.secure_url);
    } catch (err) {
      toast.update(toastId, {
        render: `Failed to upload ${file.name}`,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      console.error(err);
    }
  }

  return urls;
};
