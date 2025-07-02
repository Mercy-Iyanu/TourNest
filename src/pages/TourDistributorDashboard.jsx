import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Button,
  Typography,
} from "@mui/material";

const API_URL = "http://localhost:5000/api/packages";

const TourDistributorDashboard = () => {
  const [tours, setTours] = useState([]);
  const [pricingRules, setPricingRules] = useState([]);

  const fetchRules = async () => {
    const distributor = JSON.parse(localStorage.getItem("authUser"));
    if (!distributor || !distributor._id) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/pricing-rules?distributor=${distributor._id}`
      );
      const rules = await res.json();
      setPricingRules(rules);
    } catch (error) {
      console.error("Failed to fetch pricing rules:", error);
    }
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const enriched = data.map((pkg) => ({
          id: pkg._id,
          title: pkg.basicInfo.tour_name,
          description: pkg.basicInfo.description,
          category: pkg.basicInfo.tour_type,
          currency: pkg.pricing.currency || "",
          basePrice: pkg.pricing.pricePerPerson,
          image: pkg.media?.tourImages?.[0] || "",
          adjustedPrice: pkg.pricing.pricePerPerson,
          adjustmentType: null,
          percentage: "0%",
        }));

        setTours(enriched);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      }
    };

    fetchPackages();
    fetchRules();
  }, []);

  const getRulesForTour = (tourId) =>
    pricingRules.filter((rule) => {
      const packageId =
        typeof rule.package === "object" ? rule.package._id : rule.package;
      return packageId === tourId;
    });

  return (
    <Box p={4} bgcolor="#f5f7fa" minHeight="100vh">
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Available Tours
      </Typography>

      <Stack spacing={3}>
        {tours.map((tour) => {
          const rules = getRulesForTour(tour.id);
          const activeRules = rules.filter((r) => r.isActive);

          return (
            <Card key={tour.id} sx={{ display: "flex", boxShadow: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: 180 }}
                image={tour.image}
                alt={tour.title}
              />
              <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <CardContent>
                  <Typography variant="h6">{tour.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tour.description}
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    📁 Category: <strong>{tour.category}</strong>
                  </Typography>
                  <Typography variant="body2">
                    💰 Base Price:{" "}
                    <strong>
                      {tour.currency}
                      {tour.basePrice}
                    </strong>
                  </Typography>

                  <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
                    <Chip
                      label={`${rules.length} Total Rule${
                        rules.length !== 1 ? "s" : ""
                      }`}
                      color="default"
                    />
                    <Chip
                      label={`${activeRules.length} Active`}
                      color={activeRules.length > 0 ? "success" : "default"}
                    />
                  </Stack>
                </CardContent>
              </Box>
            </Card>
          );
          s;
        })}
      </Stack>
    </Box>
  );
};

export default TourDistributorDashboard;
