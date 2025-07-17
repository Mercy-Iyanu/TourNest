import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const DistributorBookingWidget = ({ distributorId }) => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  if (tours.length === 0) {
    return (
      <Box p={4} textAlign="center">
        <Typography>No tours available at the moment.</Typography>
      </Box>
    );
  }

  return (
    <Box p={4} bgcolor="#fafafa">
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Available Tours
      </Typography>
      <Grid container spacing={3}>
        {tours.map((tour) => (
          <Grid item xs={12} sm={6} md={4} key={tour.id}>
            <Card elevation={2}>
              <CardMedia
                component="img"
                height="180"
                image={tour.image || "/fallback.jpg"}
                alt={tour.title}
              />
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  {tour.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={1}>
                  {tour.description}
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  ${tour.price} per person
                </Typography>
                {tour.availability?.length > 0 && (
                  <Typography variant="caption" color="textSecondary">
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
                  >
                    Book Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DistributorBookingWidget;
