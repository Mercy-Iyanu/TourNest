import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Chip,
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";

const API_URL = "http://localhost:5000/api/packages";

const TourPackageTable = () => {
  const navigate = useNavigate();
  const [tourPackages, setTourPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const formattedPackages = data.map((pkg) => ({
          id: pkg._id,
          name: pkg.basicInfo.tour_name,
          location: `${pkg.basicInfo.city}, ${pkg.basicInfo.state}, ${pkg.basicInfo.country}`,
          duration: pkg.basicInfo.duration || "N/A",
          price: `${pkg.pricing.pricePerPerson?.toLocaleString()} ${
            pkg.pricing.currency || ""
          }`,
          status: pkg.pricing.availability?.[0]?.is_available
            ? "active"
            : "inactive",
        }));

        setTourPackages(formattedPackages);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  const handleDelete = (id) => {
    const updatedPackages = tourPackages.filter((pkg) => pkg.id !== id);
    localStorage.setItem("tourPackages", JSON.stringify(updatedPackages));
    setTourPackages(updatedPackages);
  };

  const handleRowClick = (id) => {
    navigate(`/package/${id}`);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        My Tour Packages
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Location</strong>
              </TableCell>
              <TableCell>
                <strong>Duration</strong>
              </TableCell>
              <TableCell>
                <strong>Price</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tourPackages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No packages found.
                </TableCell>
              </TableRow>
            ) : (
              tourPackages.map((pkg) => (
                <TableRow
                  key={pkg.id}
                  hover
                  onClick={() => handleRowClick(pkg.id)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>{pkg.name}</TableCell>
                  <TableCell>{pkg.location}</TableCell>
                  <TableCell>{pkg.duration} days</TableCell>
                  <TableCell>{pkg.price}</TableCell>
                  <TableCell>
                    <Chip
                      label={pkg.status}
                      size="small"
                      color={pkg.status === "active" ? "success" : "warning"}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell
                    onClick={(e) => e.stopPropagation()}
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    <IconButton
                      color="primary"
                      onClick={() => navigate(`/edit-package/${pkg.id}`)}
                    >
                      <FaEdit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(pkg.id)}
                    >
                      <FaTrash />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TourPackageTable;
