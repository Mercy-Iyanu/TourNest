import React from "react";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";

function Layout() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <TopNav />
      <Box component="main" flex={1} py={2}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
      <BottomNav />
    </Box>
  );
}

export default Layout;
