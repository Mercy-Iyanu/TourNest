import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
  Paper,
  TableContainer,
  Chip,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../components/ui/ConfirmationDialog";

const TourOwnerManageBookingTable = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [showDialog, setShowDialog] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  const user = JSON.parse(localStorage.getItem("authUser"));
  const ownerId = user?._id;

  const fetchBookings = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/bookings/owner/${ownerId}`
      );
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error("Fetch bookings failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (bookingId, newStatus) => {
    try {
      await fetch(`http://localhost:5000/api/bookings/${bookingId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchBookings();
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  const handleCancelClick = (booking) => {
    setBookingToCancel(booking);
    setShowDialog(true);
  };

  const handleDialogConfirm = async () => {
    if (!bookingToCancel) return;
    try {
      await updateStatus(bookingToCancel._id, "cancelled");
      toast.success("Booking has been cancelled.");
    } catch (error) {
      toast.error("Failed to cancel booking.");
    } finally {
      setShowDialog(false);
      setBookingToCancel(null);
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setBookingToCancel(null);
  };

  useEffect(() => {
    if (ownerId) fetchBookings();
  }, [ownerId]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress size={40} />
      </Box>
    );

  return (
    <Box p={{ xs: 2, md: 4 }}>
      <Button onClick={() => navigate(-1)} sx={{ mb: 3 }}>
        ← Back
      </Button>

      <Typography variant="h5" fontWeight="bold" mb={3}>
        Manage Tour Bookings
      </Typography>

      <Paper elevation={2} sx={{ borderRadius: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Tour</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Booking Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Travelers</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Payment Status
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((b) => (
                <TableRow key={b._id} hover>
                  <TableCell>{b.tourId?.basicInfo?.tour_name || "—"}</TableCell>
                  <TableCell>{b.userDetails?.name}</TableCell>
                  <TableCell>{b.userDetails?.email}</TableCell>
                  <TableCell>
                    {new Date(b.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{b.travelers}</TableCell>
                  <TableCell>
                    <Chip
                      label={b.status === "confirmed" ? "Paid" : "Pending"}
                      color={b.status === "confirmed" ? "success" : "warning"}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {b.status === "confirmed" ? (
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleCancelClick(b)}
                        >
                          Cancel Booking
                        </Button>
                      </Stack>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Awaiting Payment
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <ConfirmationDialog
        open={showDialog}
        onCancel={handleDialogClose}
        onConfirm={handleDialogConfirm}
        title="Are you absolutely sure?"
        description="This action is irrevocable. Cancelling this booking cannot be undone. Decide wisely."
        confirmText="Yes, Cancel"
        confirmColor="error"
      />
    </Box>
  );
};

export default TourOwnerManageBookingTable;
