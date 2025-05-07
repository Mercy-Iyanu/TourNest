import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, Typography, Grid, TextField, Button, CardMedia, Box
} from '@mui/material';

const mockTourPackages = [
  {
    id: 1,
    title: 'Safari Adventure',
    description: 'Explore the African savannah and spot the Big Five.',
    image: 'https://images.pexels.com/photos/2904701/pexels-photo-2904701.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200',
    category: 'Adventure',
    basePrice: 1200
  },
  {
    id: 2,
    title: 'Beach Paradise',
    description: 'Relax on pristine beaches and enjoy local cuisine.',
    image: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200',
    category: 'Beach',
    basePrice: 950
  },
  {
    id: 3,
    title: 'Cultural Discovery',
    description: 'Immerse in local traditions and heritage sites.',
    image: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200',
    category: 'Cultural',
    basePrice: 700
  }
];

const TourDistributorDashboard = () => {
  const [tours, setTours] = useState([]);
  const [pricingRules, setPricingRules] = useState([]);

  useEffect(() => {
    const enrichedTours = mockTourPackages.map(pkg => ({
      ...pkg,
      adjustedPrice: pkg.basePrice
    }));
    setTours(enrichedTours);
  }, []);

  useEffect(() => {
    const updatedTours = mockTourPackages.map(pkg => {
      const rule = pricingRules.find(r => r.category === pkg.category);
      if (rule) {
        const percent = parseFloat(rule.percentage);
        const adjustmentAmount = (percent / 100) * pkg.basePrice;
        const adjusted =
          rule.adjustmentType === 'Markup'
            ? pkg.basePrice + adjustmentAmount
            : pkg.basePrice - adjustmentAmount;

        return {
          ...pkg,
          adjustedPrice: adjusted.toFixed(2),
          adjustmentType: rule.adjustmentType,
          percentage: `${percent}%`
        };
      }
      return {
        ...pkg,
        adjustedPrice: pkg.basePrice,
        adjustmentType: null,
        percentage: '0%'
      };
    });
    setTours(updatedTours);
  }, [pricingRules]);

  return (
    <Box className="p-6 bg-gray-100 min-h-screen">
      <Grid container spacing={4}>
        {tours.map((tour) => (
          <Grid item xs={12} md={6} lg={4} key={tour.id}>
            <Card className="shadow-lg">
              <CardMedia
                component="img"
                height="200"
                image={tour.image}
                alt={tour.title}
              />
              <CardContent>
                <Typography variant="h6" className="mb-2 font-semibold">
                  {tour.title}
                </Typography>
                <Typography variant="body2" className="mb-2 text-gray-700">
                  {tour.description}
                </Typography>
                <Typography variant="body1" className="mb-1 text-green-700">
                  Base Price: ${tour.basePrice}
                </Typography>
                {tour.adjustmentType && (
                  <Typography variant="body2" className="text-gray-600 mb-1">
                    {tour.adjustmentType} Applied: {tour.percentage}
                  </Typography>
                )}
                <Typography variant="body1" className="text-indigo-700 font-medium">
                  Final Price: ${tour.adjustedPrice}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TourDistributorDashboard;