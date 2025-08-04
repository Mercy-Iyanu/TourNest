import React from "react";
import { Box, Typography } from "@mui/material";

function BottomNav() {
  return (
    <Box
      component="footer"
      position="fixed"
      bottom={0}
      left={0}
      width="100%"
      bgcolor="grey.900"
      color="grey.300"
      px={{ xs: 2, md: 5 }}
      py={1.5}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      boxShadow={3}
      zIndex={10}
    >
      <Typography variant="caption" color="grey.400">
        &copy; {new Date().getFullYear()} GetThere
      </Typography>
    </Box>
  );
}

export default BottomNav;
