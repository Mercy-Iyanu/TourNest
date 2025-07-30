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
  CircularProgress,
  Box,
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import ConfirmDialog from "./ConfirmDialog";

const API_URL = "http://localhost:5000/api/packages";

const TourPackageTable = () => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [tourPackages, setTourPackages] = useState([]);
  const [loading, setLoading] = useState(true);

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
          createdAt: new Date(pkg.createdAt).toLocaleDateString(),
        }));

        setTourPackages(formattedPackages);
      } catch (error) {
        console.error("Error fetching packages:", error);
        toast.error("Failed to fetch packages");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const openDeleteDialog = (id) => {
    setSelectedId(id);
    setDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDialogOpen(false);
    setSelectedId(null);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/${selectedId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Delete failed");

      setTourPackages((prev) => prev.filter((pkg) => pkg.id !== selectedId));
      toast.success("Package deleted successfully");
    } catch (err) {
      toast.error("Error deleting package");
      console.error(err);
    } finally {
      closeDeleteDialog();
    }
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
                <strong>Created</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Box py={3}>
                    <CircularProgress size={24} />
                  </Box>
                </TableCell>
              </TableRow>
            ) : tourPackages.length === 0 ? (
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
                  <TableCell>{pkg.createdAt}</TableCell>
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
                      onClick={() => openDeleteDialog(pkg.id)}
                    >
                      <FaTrash />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <ConfirmDialog
            open={dialogOpen}
            title="Confirm Deletion"
            description="Are you sure you want to delete this package? This action is irreversible."
            onClose={closeDeleteDialog}
            onConfirm={confirmDelete}
            confirmText="Delete"
          />
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TourPackageTable;
