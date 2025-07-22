import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Grid,
  Skeleton,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  ViewList,
  ViewModule,
  SentimentVeryDissatisfied,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const DistributorBookingWidget = ({ distributorId }) => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("list");
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (isMobile) setViewMode("grid");
  }, [isMobile]);

  useEffect(() => {
    const fetchWidgetTours = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/widget/${distributorId}`
        );
        const data = await res.json();
        setTours(data);
      } catch (err) {
        console.error("Failed to load widget tours:", err);
      } finally {
        setLoading(false);
      }
    };

    if (distributorId) {
      fetchWidgetTours();
    }
  }, [distributorId]);

  const handleViewChange = (_, newView) => {
    if (newView) setViewMode(newView);
  };

  const renderCard = (tour) => (
    <Card
      key={tour.id}
      sx={{
        display: viewMode === "list" ? "flex" : "block",
        flexDirection: "row",
        borderRadius: 2,
        boxShadow: 2,
        overflow: "hidden",
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.01)" },
        height: "100%",
      }}
    >
      <CardMedia
        component="img"
        image={tour.image || "/fallback.jpg"}
        alt={tour.title}
        sx={{
          width: viewMode === "list" ? 180 : "100%",
          height: viewMode === "list" ? "100%" : 180,
          objectFit: "cover",
        }}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography
          variant="h6"
          fontWeight={600}
          gutterBottom
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
          }}
        >
          {tour.title}
        </Typography>
        <Typography variant="subtitle1" fontWeight={500} mb={1}>
          {tour.currency || "$"}
          {tour.price} per person
        </Typography>
        {tour.availability?.length > 0 && (
          <Typography variant="caption" color="text.secondary">
            Next dates: {tour.availability.slice(0, 2).join(", ")}
          </Typography>
        )}
        <Box mt={2}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={() =>
              navigate(
                `/book/${tour.id}?distributorId=${encodeURIComponent(
                  distributorId
                )}&tourTitle=${encodeURIComponent(tour.title)}`
              )
            }
            aria-label={`Book ${tour.title}`}
          >
            Book Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box p={4}>
        <Grid container spacing={3}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Card>
                <Skeleton variant="rectangular" height={180} />
                <CardContent>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="40%" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (tours.length === 0) {
    return (
      <Box p={4} textAlign="center">
        <SentimentVeryDissatisfied fontSize="large" color="disabled" />
        <Typography variant="h6" color="textSecondary" gutterBottom>
          😞 No tours available at the moment.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Please check back later or contact the distributor for more info.
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={4} bgcolor="#f9f9f9">
      <Box
        mb={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h5" fontWeight="bold">
          Available Tours
        </Typography>
        {!isMobile && (
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewChange}
            aria-label="Select view layout for tour list"
            size="small"
          >
            <ToggleButton value="list" aria-label="List view">
              <ViewList />
            </ToggleButton>
            <ToggleButton value="grid" aria-label="Grid view">
              <ViewModule />
            </ToggleButton>
          </ToggleButtonGroup>
        )}
      </Box>

      <Grid container spacing={3}>
        {tours.map((tour) => (
          <Grid
            item
            xs={12}
            sm={viewMode === "list" ? 12 : 6}
            md={viewMode === "list" ? 12 : 4}
            key={tour.id}
          >
            {renderCard(tour)}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DistributorBookingWidget;
