import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Chip from '@mui/material/Chip';
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const TourPackageSummary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    const fullPackage = JSON.parse(localStorage.getItem("fullTourPackages")) || [];
    const foundTour = fullPackage[id];
    setTour(foundTour);
  }, [id]);

  if (!tour) {
    return (
      <div className="p-6">
        <button onClick={() => navigate(-1)} className="mb-4 text-blue-600">← Go Back</button>
        <p className="text-red-600">Tour not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600">← Go Back</button>

      <div>
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">Tour Package ID:</h2>
          {/* <Chip label={tour.additional?.tags.join(', ')} color="danger" variant="filled" size="big" /> */}
        </div>
        <div>
          <div className='flex gap-6'>
            <h3 className='font-medium text-2xl mb-4'> {tour.basicInfo?.tour_name} </h3>
            <Chip label={tour.basicInfo?.tour_type} color="primary" variant="filled" size="big" />
          </div>
          <div className="flex items-center gap-16">
            <div className="flex items-center gap-1 font-medium text-gray-600 mb-4">
              <LocationOnIcon fontSize="medium" className="text-blue-500" />
              <span>{`${tour.basicInfo?.city}, ${tour.basicInfo?.state}, ${tour.basicInfo?.country}`}</span>
            </div>
            <div className="flex items-center gap-1 font-medium text-gray-600 mb-4">
              <CalendarMonthIcon fontSize="medium" className="text-blue-500" />
              <span>{tour.basicInfo?.duration} days</span>
            </div>
          </div>
          <p className="text-base mb-2">{tour.basicInfo?.description}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className='font-medium text-2xl mb-4'> Pricing </h3>
        <div className='flex justify-between'>
          <div>
            <Box display="flex" alignItems="baseline" gap={1}>
              <Typography variant="body2" color="text.secondary"> {tour.pricing?.currency} </Typography>
              <Typography variant="h5" color="primary" fontWeight={600}> {Number(tour.pricing?.pricePerPerson).toLocaleString()} </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}> per person </Typography>
          </div>
          <Box> {tour.pricing?.availability.map((a, index) => (
            <Box key={index} mb={2} className='text-center'>
              <div className='text-center mb-4'>
                <Typography variant="body2">max. of </Typography>
                  <span className='font-bold text-xl'>{a.max_guests} people</span>
              </div>
              <Typography variant="body2" color={a.is_available ? 'green' : 'red'}> {a.is_available ? 'Available' : 'Unavailable'} </Typography>
            </Box>
            ))}
          </Box>
        </div>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom> Discounts </Typography>
          <p variant="body1"> {tour.pricing?.discount?.discountType} - {tour.pricing?.discount?.discountValue}% (Min Group: {tour.pricing?.discount?.minGroupSize}) </p>
          <p variant="body2" color="text.secondary"> {tour.pricing?.discount?.startDate ? new Date(tour.pricing?.discount?.startDate).toLocaleDateString() : 'N/A'} to {tour.pricing?.discount?.endDate ? new Date(tour.pricing?.discount?.endDate).toLocaleDateString() : 'N/A'} </p>
        </Box>
      </div>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <h3 className='font-medium text-2xl mb-4'>
            The Experience
        </h3>
        </AccordionSummary>
        <AccordionDetails>
            <div className="space-y-3">
              <div>
                  <p className="text-1xl mb-3">Day {tour.itinerary?.day}</p>
                  <div className="flex items-center gap-16">
                    <div className="flex items-center gap-1 font-medium text-gray-600 mb-4">
                      <AccessTimeIcon fontSize="medium" className="text-blue-500" />
                      <span>{tour.itinerary?.startTime ? new Date(tour.itinerary?.startTime).toLocaleString() : 'N/A'} - {tour.itinerary?.endTime ? new Date(tour.itinerary?.endTime).toLocaleString() : 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-1 font-medium text-gray-600 mb-4">
                      <LocationOnIcon fontSize="medium" className="text-blue-500" />
                        <span>{tour.itinerary?.location}</span>
                      </div>
                  </div>
                  <p className="font-semibold text-xl">{tour.itinerary?.title}</p>
                  <p variant="body1">{tour.itinerary?.description}</p>
              </div>
            </div>
        </AccordionDetails>
      </Accordion>

      <div className="mb-6">
        <h3 className='font-medium text-2xl mb-4'>
            Booking Details
        </h3>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom> 
          Accepted mode of payment
        </Typography>
        <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
        {tour.booking?.paymentMethods.map((method, idx) => (
          <Chip key={idx} label={method.name} variant="filled" />
        ))}
        </Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Number of participants
        </Typography>
        <Box display="flex" gap={1} mb={2}>
          <Chip label={`Min. ${tour.booking?.minGroupSize} participants`} variant="outlined" />
          <Chip label={`Max. ${tour.booking?.maxGroupSize} participants`} variant="outlined" />
        </Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Cancellation terms
        </Typography>
        <p>{tour.booking?.cancellationPolicy}</p>
      </div>

      <div className="mb-6">
        <h3 className='font-medium text-2xl mb-4'>
            Media and Assets
        </h3>
        <div className="mb-4">
          <Typography variant="subtitle2" color="text.secondary" gutterBottom> 
          Images URLs
              </Typography>
          <div className="flex flex-wrap gap-2">
            {tour.media?.tourImages.map((img, index) => (
              <a
                key={index}
                href={img.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                Image {index + 1}
              </a>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <Typography variant="subtitle2" color="text.secondary" gutterBottom> 
          Videos URLs
              </Typography>
          <div className="flex flex-wrap gap-2">
            {tour.media?.tourVideos.map((vid, index) => (
              <a
                key={index}
                href={vid.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                Video {index + 1}
              </a>
            ))}
          </div>
        </div>
        <div>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom> 
          Other Files
              </Typography>
          <div className="flex flex-wrap gap-2">
            {tour.media?.additionalFiles.map((file, index) => (
              <a
                key={index}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                File {index + 1}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className='font-medium text-2xl mb-4'>
            Additional Information
        </h3>
        <div className="space-y-6 mb-6">
          <Typography variant="subtitle2" color="text.secondary" gutterBottom> 
            Contact Details
          </Typography>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-gray-800">
              <span className="inline-block">👤</span>
              <Typography>{tour.additional?.contact.name}</Typography>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="inline-block">📞</span>
              <Typography>{tour.additional?.contact.phone}</Typography>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="inline-block">📧</span>
              <Typography>{tour.additional?.contact.email}</Typography>
            </div>
          </div>
        </div>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom> 
          Requirements
        </Typography>
        <p>{tour.additional?.requirements}</p>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom> 
          Tags
        </Typography>
        <p>{tour.additional?.tags.join(', ')}</p>
      </div>
    </div>
  );
};

export default TourPackageSummary;