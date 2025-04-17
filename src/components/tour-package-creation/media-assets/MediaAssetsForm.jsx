import React, {useState} from 'react'
import TourImagesUploader from './TourImagesUploader'
import TourVideosUploader from './TourVideosUploader'
import AdditionalFilesUploader from './AdditionalFilesUploader'

const MediaAssetsForm = ({ formData, setFormData }) => {
  const [tourImages, setTourImages] = useState(formData.tourImages);
  const [tourVideos, setTourVideos] = useState(formData.tourVideos);
  const [additionalFiles, setAdditionalFiles] = useState(formData.additionalFiles);

  const updateMedia = (newTourImages, newTourVideos, newAdditionalFiles) => {
    setFormData(prev => ({
      ...prev,
      media: {
        ...prev.media,
        tourImages: newTourImages,
        tourVideos: newTourVideos,
        additionalFiles: newAdditionalFiles,
      }
    }));
  };
  
  return (
    <div className="p-6 max-w-screen-lg mx-auto space-y-8">
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
    </div>
  )
}

export default MediaAssetsForm