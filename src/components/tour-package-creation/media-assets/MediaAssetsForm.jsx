import React from 'react'
import TourImagesUploader from './TourImagesUploader'
import TourVideosUploader from './TourVideosUploader'
import AdditionalFilesUploader from './AdditionalFilesUploader'

const MediaAssetsForm = () => {
  return (
    <div className="p-6 max-w-screen-lg mx-auto space-y-8">
      <TourImagesUploader />
      <TourVideosUploader />
      <AdditionalFilesUploader />
    </div>
  )
}

export default MediaAssetsForm