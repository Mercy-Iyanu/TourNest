import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Button,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import {
  FiLogOut,
  FiMenu,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";

function TopNav() {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileMenu, setProfileMenu] = useState(null);
  const [userRole, setUserRole] = useState("");

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("authUser"));
    const storedRole = localStorage.getItem("userRole");

    if (storedUser) {
      setUser(storedUser);
      setUserRole(storedRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const openDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const openProfile = (event) => {
    setProfileMenu(event.currentTarget);
  };

  const closeMenus = () => {
    setAnchorEl(null);
    setProfileMenu(null);
  };

  return (
    <AppBar position="static" color="default" elevation={2}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link
          to={
            userRole === "tour-owner"
              ? "/owner-dashboard"
              : userRole === "tour-distributor"
              ? "/distributor-dashboard"
              : "/"
          }
        >
          <Box display="flex" alignItems="center">
            <img src="/logo.png" alt="Logo" height="50" />
          </Box>
        </Link>

        <Box display="flex" alignItems="center" gap={2}>
          {userRole === "tour-owner" && (
            <>
              <Button component={Link} to="/pricing-rule-page" color="inherit">
                Pricing Rule
              </Button>

              <Button
                color="inherit"
                onClick={openDropdown}
                endIcon={<FiChevronDown />}
              >
                Inventory
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeMenus}
              >
                <MenuItem
                  component={Link}
                  to="/manage-booking"
                  onClick={closeMenus}
                >
                  Manage Booking
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/manage-inventory"
                  onClick={closeMenus}
                >
                  Manage Inventory
                </MenuItem>
              </Menu>
            </>
          )}

          {userRole === "tour-distributor" && (
            <>
              <Button component={Link} to="/pricing-rule-form" color="inherit">
                Pricing Rule
              </Button>
              <Button component={Link} to="/sales-analytics" color="inherit">
                Sales Analytics
              </Button>
            </>
          )}

          {user && (
            <>
              <Button
                onClick={openProfile}
                color="inherit"
                startIcon={
                  <Avatar sx={{ bgcolor: "grey.500", width: 32, height: 32 }}>
                    {user.firstName?.charAt(0).toUpperCase()}
                  </Avatar>
                }
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                >
                  <Typography variant="caption" fontWeight={600}>
                    {user.displayName || user.firstName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {userRole?.replace("-", " ")}
                  </Typography>
                </Box>
              </Button>

              <Menu
                anchorEl={profileMenu}
                open={Boolean(profileMenu)}
                onClose={closeMenus}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem component={Link} to="/profile" onClick={closeMenus}>
                  View Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <FiLogOut style={{ marginRight: 8 }} /> Logout
                </MenuItem>
              </Menu>
            </>
          )}

          {/* Mobile Menu (optional if needed) */}
          {isMobile && (
            <IconButton edge="end" onClick={openDropdown}>
              <FiMenu />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopNav;
