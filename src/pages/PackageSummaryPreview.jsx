import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Skeleton from "@mui/material/Skeleton";

const API_URL = "http://localhost:5000/api/packages";

const TourPackageSummary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Failed to fetch tour details");
        const data = await response.json();
        setTour(data);
      } catch (error) {
        console.error(error);
        setTour(null);
      }
    };

    fetchTourDetails();
  }, [id]);

  const TourSkeleton = () => (
    <div className="p-6 max-w-4xl mx-auto">
      <button className="mb-4 text-blue-600">← Go Back</button>

      <Skeleton variant="text" width={250} height={40} />
      <Skeleton variant="text" width={150} height={30} />

      <Skeleton
        variant="rectangular"
        width="100%"
        height={150}
        className="my-4"
      />

      <div className="space-y-2">
        <Skeleton variant="text" width="95%" />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="85%" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="75%" />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="100%" />
      </div>

      <Skeleton variant="text" width={250} height={40} />
      <Skeleton variant="text" width={150} height={30} />

      <Skeleton
        variant="rectangular"
        width="100%"
        height={150}
        className="my-4"
      />

      <div className="space-y-2">
        <Skeleton variant="text" width="95%" />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="85%" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="75%" />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="100%" />
      </div>
    </div>
  );

  if (!tour) return <TourSkeleton />;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 mb-8">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <div className="border-b pb-6">
        <h1 className="text-3xl font-bold mb-2">{tour.basicInfo?.tour_name}</h1>
        <div className="flex items-center gap-4 flex-wrap text-gray-600 text-sm">
          <Chip
            label={tour.basicInfo?.tour_type}
            color="primary"
            size="small"
          />
          <span className="flex items-center gap-1">
            <LocationOnIcon className="text-blue-500" fontSize="small" />
            {`${tour.basicInfo?.city}, ${tour.basicInfo?.state}, ${tour.basicInfo?.country}`}
          </span>
          <span className="flex items-center gap-1">
            <CalendarMonthIcon className="text-blue-500" fontSize="small" />
            {tour.basicInfo?.duration} days
          </span>
        </div>
        <p className="text-gray-700 mt-4">{tour.basicInfo?.description}</p>
      </div>

      <Card title="Pricing">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Per Person</p>
            <p className="text-2xl font-semibold text-blue-600">
              {tour.pricing?.currency}{" "}
              {Number(tour.pricing?.pricePerPerson).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Availability</p>
            <ul>
              {tour.pricing?.availability.map((a, idx) => (
                <li key={idx} className="flex justify-between text-sm">
                  <span>Max {a.max_guests} guests</span>
                  <span
                    className={
                      a.is_available ? "text-green-600" : "text-red-600"
                    }
                  >
                    {a.is_available ? "Available" : "Unavailable"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {tour.pricing?.discount && (
          <div className="mt-4 text-sm text-gray-600">
            <p>
              Discount: <strong>{tour.pricing.discount.discountValue}%</strong>{" "}
              ({tour.pricing.discount.discountType}) - Min group:{" "}
              {tour.pricing.discount.minGroupSize}
            </p>
            <p>
              Valid:{" "}
              {new Date(tour.pricing.discount.startDate).toLocaleDateString()} –{" "}
              {new Date(tour.pricing.discount.endDate).toLocaleDateString()}
            </p>
          </div>
        )}
      </Card>

      <Card title="Experience">
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <p className="font-semibold">Itinerary</p>
          </AccordionSummary>
          <AccordionDetails>
            {tour.itinerary ? (
              <div className="space-y-4">
                <p className="font-medium text-lg">Day {tour.itinerary.day}</p>
                <div className="text-sm text-gray-700 space-y-2">
                  <div className="flex items-center gap-2">
                    <AccessTimeIcon
                      className="text-blue-500"
                      fontSize="small"
                    />
                    {new Date(tour.itinerary.startTime).toLocaleString()} –{" "}
                    {new Date(tour.itinerary.endTime).toLocaleString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <LocationOnIcon
                      className="text-blue-500"
                      fontSize="small"
                    />
                    {tour.itinerary.location}
                  </div>
                  <p className="font-semibold">{tour.itinerary.title}</p>
                  <p>{tour.itinerary.description}</p>
                </div>
              </div>
            ) : (
              <p>No itinerary info provided.</p>
            )}
          </AccordionDetails>
        </Accordion>
      </Card>

      <Card title="Booking Details">
        <div className="space-y-3 text-sm text-gray-700">
          <div>
            <p className="font-medium">Payment Methods:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {tour.booking?.paymentMethods.map((m, i) => (
                <Chip key={i} label={m.name} />
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-2">
            <Chip
              label={`Min. ${tour.booking?.minGroupSize} participants`}
              variant="outlined"
            />
            <Chip
              label={`Max. ${tour.booking?.maxGroupSize} participants`}
              variant="outlined"
            />
          </div>

          <div>
            <p className="font-medium mt-4">Cancellation Policy:</p>
            <p>{tour.booking?.cancellationPolicy}</p>
          </div>
        </div>
      </Card>

      <Card title="Media & Assets">
        {tour.media?.tourImages?.length > 0 && (
          <div>
            <p className="font-medium text-sm text-gray-500">Image URLs</p>
            <div className="flex flex-wrap gap-2">
              {tour.media.tourImages.map((img, i) => (
                <a
                  key={i}
                  href={img.url}
                  target="_blank"
                  className="text-blue-600 underline text-xs"
                >
                  Image {i + 1}
                </a>
              ))}
            </div>
          </div>
        )}

        {tour.media?.tourVideos?.length > 0 && (
          <div>
            <p className="font-medium text-sm text-gray-500 mt-4">Video URLs</p>
            <div className="flex flex-wrap gap-2">
              {tour.media.tourVideos.map((vid, i) => (
                <a
                  key={i}
                  href={vid.url}
                  target="_blank"
                  className="text-blue-600 underline text-xs"
                >
                  Video {i + 1}
                </a>
              ))}
            </div>
          </div>
        )}

        {tour.media?.additionalFiles?.length > 0 && (
          <div>
            <p className="font-medium text-sm text-gray-500 mt-4">
              Other Files
            </p>
            <div className="flex flex-wrap gap-2">
              {tour.media.additionalFiles.map((file, i) => (
                <a
                  key={i}
                  href={file.url}
                  target="_blank"
                  className="text-blue-600 underline text-xs"
                >
                  File {i + 1}
                </a>
              ))}
            </div>
          </div>
        )}
      </Card>

      <Card title="Additional Information">
        <div className="space-y-3 text-sm text-gray-700">
          <div>
            <p className="font-medium">Contact</p>
            <p>👤 {tour.additional?.contact?.name}</p>
            <p>📞 {tour.additional?.contact?.phone}</p>
            <p>📧 {tour.additional?.contact?.email}</p>
          </div>
          <div>
            <p className="font-medium mt-4">Requirements</p>
            <p>{tour.additional?.requirements}</p>
          </div>
          <div>
            <p className="font-medium mt-4">Tour Tags</p>
            <p>{tour.additional?.tags.join(", ")}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TourPackageSummary;
