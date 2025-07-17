import React from "react";
import { useNavigate } from "react-router-dom";
import TourPackageTable from "../components/ui/TourPackageTable";
import {
  Container,
  Box,
  Button,
  Typography,
  Stack,
  Paper,
} from "@mui/material";

const TourOwnerDashboard = () => {
  const navigate = useNavigate();

  const handleCreatePackage = () => {
    navigate("/create-package");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.100", py: 4 }}>
      <Container maxWidth="lg">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            Welcome Back, Friend!
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={handleCreatePackage}
            sx={{ textTransform: "none", boxShadow: 1 }}
          >
            + Create Tour Package
          </Button>
        </Stack>

        <Paper elevation={0}>
          <TourPackageTable />
        </Paper>
      </Container>
    </Box>
  );
};

export default TourOwnerDashboard;
