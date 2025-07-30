import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Skeleton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

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
        setTour({
          ...data,
          media: {
            ...data.media,
            tourImages: data.media?.tourImages?.filter((img) => img?.url),
            tourVideos: data.media?.tourVideos?.filter((vid) => vid?.url),
            additionalFiles: data.media?.additionalFiles?.filter(
              (file) => file?.url
            ),
          },
        });
      } catch (error) {
        console.error(error);
        setTour(null);
      }
    };
    fetchTourDetails();
  }, [id]);

  const TourSkeleton = () => (
    <Box sx={{ p: 4, maxWidth: "960px", mx: "auto" }}>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        ← Go Back
      </Button>
      <Skeleton variant="text" width={250} height={40} />
      <Skeleton variant="text" width={150} height={30} />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={150}
        sx={{ my: 2 }}
      />
      {[...Array(7)].map((_, i) => (
        <Skeleton key={i} variant="text" width={`${100 - i * 5}%`} />
      ))}
    </Box>
  );

  if (!tour) return <TourSkeleton />;

  return (
    <Box sx={{ p: 4, maxWidth: "1040px", mx: "auto", mb: 6 }}>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        ← Back
      </Button>

      <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {tour.basicInfo?.tour_name}
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
          <Chip
            label={tour.basicInfo?.tour_type}
            color="primary"
            size="small"
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <LocationOnIcon color="primary" fontSize="small" />
            <Typography variant="body2">
              {`${tour.basicInfo?.city}, ${tour.basicInfo?.state}, ${tour.basicInfo?.country}`}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <CalendarMonthIcon color="primary" fontSize="small" />
            <Typography variant="body2">
              {tour.basicInfo?.duration} days
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" color="text.secondary">
          {tour.basicInfo?.description}
        </Typography>
      </Box>

      <Card>
        <CardHeader title="Pricing" />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Per Person
              </Typography>
              <Typography variant="h6" color="primary">
                {tour.pricing?.currency}{" "}
                {Number(tour.pricing?.pricePerPerson).toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Availability
              </Typography>
              {Array.isArray(tour.pricing?.availability) &&
                tour.pricing?.availability.map((a, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.875rem",
                      mt: 0.5,
                    }}
                  >
                    <span>Max {a.max_guests} guests</span>
                    <span
                      style={{ color: a.is_available ? "#2e7d32" : "#d32f2f" }}
                    >
                      {a.is_available ? "Available" : "Unavailable"}
                    </span>
                  </Box>
                ))}
            </Grid>
          </Grid>

          {tour.pricing?.discount && (
            <Box mt={2}>
              <Typography variant="body2">
                <strong>Discount:</strong> {tour.pricing.discount.discountValue}
                % ({tour.pricing.discount.discountType}) - Min group:{" "}
                {tour.pricing.discount.minGroupSize}
              </Typography>
              <Typography variant="body2">
                Valid:{" "}
                {new Date(tour.pricing.discount.startDate).toLocaleDateString()}{" "}
                – {new Date(tour.pricing.discount.endDate).toLocaleDateString()}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Experience" />
        <CardContent>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>Itinerary</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {tour.itinerary ? (
                <Box>
                  <Typography variant="h6">Day {tour.itinerary.day}</Typography>
                  <Box mt={1}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AccessTimeIcon color="primary" fontSize="small" />
                      <Typography variant="body2">
                        {new Date(tour.itinerary.startTime).toLocaleString()} –{" "}
                        {new Date(tour.itinerary.endTime).toLocaleString()}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LocationOnIcon color="primary" fontSize="small" />
                      <Typography variant="body2">
                        {tour.itinerary.location}
                      </Typography>
                    </Box>
                    <Typography fontWeight={600}>
                      {tour.itinerary.title}
                    </Typography>
                    <Typography>{tour.itinerary.description}</Typography>
                  </Box>
                </Box>
              ) : (
                <Typography>No itinerary info provided.</Typography>
              )}
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Booking Details" />
        <CardContent>
          <Typography fontWeight={600}>Payment Methods:</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, my: 1 }}>
            {Array.isArray(tour.booking?.paymentMethods) &&
              tour.booking?.paymentMethods.map((m, i) => (
                <Chip key={i} label={m.name} />
              ))}
          </Box>

          <Box sx={{ display: "flex", gap: 2, my: 2 }}>
            <Chip
              label={`Min. ${tour.booking?.minGroupSize} participants`}
              variant="outlined"
            />
            <Chip
              label={`Max. ${tour.booking?.maxGroupSize} participants`}
              variant="outlined"
            />
          </Box>

          <Typography fontWeight={600}>Cancellation Policy:</Typography>
          <Typography>{tour.booking?.cancellationPolicy}</Typography>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Media & Assets" />
        <CardContent>
          {Array.isArray(tour.media?.tourImages) &&
            tour.media.tourImages.length > 0 && (
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Image URLs
                </Typography>
                {tour.media.tourImages.map((img, i) =>
                  img?.url ? (
                    <Box key={i}>
                      <a
                        href={img.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Image {i + 1}
                      </a>
                    </Box>
                  ) : null
                )}
              </Box>
            )}

          {Array.isArray(tour.media?.tourVideos) &&
            tour.media.tourVideos.length > 0 && (
              <Box mt={2}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Video URLs
                </Typography>
                {tour.media.tourVideos.map((vid, i) =>
                  vid?.url ? (
                    <Box key={i}>
                      <a
                        href={vid.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Video {i + 1}
                      </a>
                    </Box>
                  ) : null
                )}
              </Box>
            )}

          {Array.isArray(tour.media?.additionalFiles) &&
            tour.media.additionalFiles.length > 0 && (
              <Box mt={2}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Other Files
                </Typography>
                {tour.media.additionalFiles.map((file, i) =>
                  file?.url ? (
                    <Box key={i}>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        File {i + 1}
                      </a>
                    </Box>
                  ) : null
                )}
              </Box>
            )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Additional Information" />
        <CardContent>
          <Box>
            <Typography fontWeight={600}>Contact</Typography>
            <Typography>👤 {tour.additional?.contact?.name}</Typography>
            <Typography>📞 {tour.additional?.contact?.phone}</Typography>
            <Typography>📧 {tour.additional?.contact?.email}</Typography>
          </Box>
          <Box mt={2}>
            <Typography fontWeight={600}>Requirements</Typography>
            <Typography>{tour.additional?.requirements}</Typography>
          </Box>
          <Box mt={2}>
            <Typography fontWeight={600}>Tour Tags</Typography>
            {Array.isArray(tour.additional?.tags) && (
              <Typography>{tour.additional.tags.join(", ")}</Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TourPackageSummary;
