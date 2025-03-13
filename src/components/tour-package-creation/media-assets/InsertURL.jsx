import React, { useState } from "react";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "YOUR_FIREBASE_API_KEY",
//   authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
//   projectId: "YOUR_FIREBASE_PROJECT_ID",
//   storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
//   appId: "YOUR_FIREBASE_APP_ID",
// };

// const firebaseApp = initializeApp(firebaseConfig);
// const storage = getStorage(firebaseApp);

const InsertURL = ({ onUpload }) => {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // 🔹 Handle Image Upload
//   const handleUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     setLoading(true);

//     const storageRef = ref(storage, `uploads/${file.name}`);
//     try {
//       await uploadBytes(storageRef, file);
//       const downloadURL = await getDownloadURL(storageRef);
      
//       // 🔹 Store image URL & Notify parent component
//       setImages((prev) => [...prev, downloadURL]);
//       if (onUpload) onUpload(downloadURL);

//     } catch (error) {
//       console.error("Error uploading image:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

  // 🔹 Remove Image
  const removeImage = (url) => {
    setImages(images.filter((img) => img !== url));
  };

  return (
    <div className="w-full p-4 border rounded-lg bg-gray-50">
      <label className="font-semibold text-lg block mb-2">Upload Images</label>

      {/* 🔹 Upload Icon */}
      <div className="flex items-center gap-4">
        <label className="cursor-pointer flex items-center justify-center w-20 h-20 border-2 border-dashed rounded-lg hover:bg-gray-200 transition">
          <FaCloudUploadAlt className="text-gray-500 text-3xl" />
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
        
        {/* 🔹 Show Uploading Indicator */}
        {loading && <p className="text-sm text-blue-500">Uploading...</p>}
      </div>

      {/* 🔹 Image Preview */}
      {images.length > 0 && (
        <div className="mt-4 flex gap-2 flex-wrap">
          {images.map((url, index) => (
            <div key={index} className="relative w-24 h-24">
              <img src={url} alt="Uploaded" className="w-full h-full object-cover rounded-lg border" />
              <FaTimes
                className="absolute top-1 right-1 text-red-500 cursor-pointer"
                onClick={() => removeImage(url)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InsertURL;
