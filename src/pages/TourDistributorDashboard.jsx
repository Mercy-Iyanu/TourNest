import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Avatar,
} from "@mui/material";

const API_URL =
  "https://sabre-tour-aggregator-backend-production.up.railway.app/api/packages";

const TourDistributorDashboard = () => {
  const [tours, setTours] = useState([]);
  const [pricingRules, setPricingRules] = useState([]);

  // Fetch data from API
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
          basePrice: pkg.pricing.pricePerPerson,
          image: pkg.media?.tourImages?.[0] || "", // Use first image or fallback
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
  }, []);

  // Apply pricing rules if any
  useEffect(() => {
    if (tours.length === 0 || pricingRules.length === 0) return;

    const updatedTours = tours.map((pkg) => {
      const rule = pricingRules.find((r) => r.category === pkg.category);
      if (rule) {
        const percent = parseFloat(rule.percentage);
        const adjustmentAmount = (percent / 100) * pkg.basePrice;
        const adjusted =
          rule.adjustmentType === "Markup"
            ? pkg.basePrice + adjustmentAmount
            : pkg.basePrice - adjustmentAmount;

        return {
          ...pkg,
          adjustedPrice: adjusted.toFixed(2),
          adjustmentType: rule.adjustmentType,
          percentage: `${percent}%`,
        };
      }
      return pkg;
    });

    setTours(updatedTours);
  }, [pricingRules]);

  return (
    <Box p={4} bgcolor="#f5f7fa" minHeight="100vh">
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Recently Added
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#1976d2" }}>
              <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
                Image
              </TableCell>
              <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
                Title
              </TableCell>
              <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
                Category
              </TableCell>
              <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
                Base Price
              </TableCell>
              <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
                Adjustment
              </TableCell>
              <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
                Final Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tours.map((tour) => (
              <TableRow key={tour.id}>
                <TableCell>
                  <Avatar
                    variant="rounded"
                    src={tour.image}
                    alt={tour.title}
                    sx={{ width: 56, height: 56 }}
                  />
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600}>{tour.title}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {tour.description}
                  </Typography>
                </TableCell>
                <TableCell>{tour.category}</TableCell>
                <TableCell>${tour.basePrice}</TableCell>
                <TableCell>
                  {tour.adjustmentType
                    ? `${tour.adjustmentType} (${tour.percentage})`
                    : "None"}
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600} color="primary">
                    ${tour.adjustedPrice}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TourDistributorDashboard;
