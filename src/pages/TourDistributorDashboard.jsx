import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RuleIcon from "@mui/icons-material/Rule";
import { motion } from "framer-motion";

const API_URL = "http://localhost:5000/api/packages";

const TourDistributorDashboard = () => {
  const [tours, setTours] = useState([]);
  const [pricingRules, setPricingRules] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
    fetchRules();
  }, []);

  const getRulesForTour = (tourId) =>
    pricingRules.filter((rule) => {
      if (!rule?.package) return false;
      const packageId =
        typeof rule.package === "object" ? rule.package._id : rule.package;
      return packageId === tourId;
    });

  return (
    <Box sx={{ p: 4, bgcolor: "#f5f7fa", minHeight: "100vh" }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Available Tours
      </Typography>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : tours.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 10,
            color: "text.secondary",
          }}
        >
          <Typography variant="h6" gutterBottom>
            No tours available
          </Typography>
          <Typography variant="body2">
            Once tours are added, they will appear here.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {tours.map((tour, index) => {
            const rules = getRulesForTour(tour.id);
            const activeRules = rules.filter((r) => r.isActive);

            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ height: "100%" }}
                key={tour.id}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 3,
                      overflow: "hidden",
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    {tour.image && (
                      <CardMedia
                        component="img"
                        height="160"
                        image={tour.image}
                        alt={tour.title}
                        onError={(e) => (e.target.src = "/fallback.jpg")}
                        sx={{ objectFit: "cover" }}
                      />
                    )}

                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {tour.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 1 }}
                        >
                          {tour.description?.slice(0, 100)}...
                        </Typography>

                        <Typography variant="body1" sx={{ mt: 0.5 }}>
                          <strong>
                            {tour.currency}
                            {tour.basePrice}
                          </strong>
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          <strong>{tour.category}</strong>
                        </Typography>

                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ mt: 2, flexWrap: "wrap" }}
                        >
                          <Chip
                            icon={<RuleIcon />}
                            label={`${rules.length} Rule${
                              rules.length !== 1 ? "s" : ""
                            }`}
                            color="default"
                          />
                          <Chip
                            icon={<CheckCircleIcon />}
                            label={`${activeRules.length} Active`}
                            color={
                              activeRules.length > 0 ? "success" : "default"
                            }
                          />
                        </Stack>
                      </Box>
                      <Box sx={{ flexGrow: 1 }} />
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{ mt: 2, alignSelf: "flex-start" }}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default TourDistributorDashboard;
