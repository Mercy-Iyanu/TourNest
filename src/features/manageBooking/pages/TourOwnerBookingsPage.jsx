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
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";

const TourOwnerBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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
      fetchBookings(); // refresh list
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  useEffect(() => {
    if (ownerId) fetchBookings();
  }, [ownerId]);

  if (loading) return <CircularProgress />;

  return (
    <Box p={4}>
      <Typography variant="h5" mb={2}>
        All Tour Bookings
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tour</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Travelers</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((b) => (
            <TableRow key={b._id}>
              <TableCell>{b.tourId?.title}</TableCell>
              <TableCell>{b.userDetails?.name}</TableCell>
              <TableCell>{b.userDetails?.email}</TableCell>
              <TableCell>{new Date(b.date).toLocaleDateString()}</TableCell>
              <TableCell>{b.travelers}</TableCell>
              <TableCell>
                <Select
                  value={b.status}
                  onChange={(e) => updateStatus(b._id, e.target.value)}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="confirmed">Confirmed</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  onClick={() => updateStatus(b._id, "confirmed")}
                >
                  Approve
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default TourOwnerBookingsPage;
