// src/components/Header.tsx
import React, { useState, type MouseEvent } from 'react';
import {
  AppBar,
  Toolbar,
  TextField,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Divider,
  ListItemIcon,
  Button,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSearch } from '../context/SearchContext';
import { useAuth } from '../context/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/signin', { replace: true });
  };

  const initial = user?.fullName?.[0]?.toUpperCase() ?? '';

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        {/* Logo */}
        <Box
          display="flex"
          alignItems="center"
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/products')}
        >
          <Box
            component="img"
            src="/NovaMart1.svg"
            alt="NovaMart"
            sx={{ height: 40, width: 'auto' }}
          />
        </Box>

        {/* Home button */}
        <Button
          color="inherit"
          onClick={() => navigate('/products')}
          sx={{ textTransform: 'none', ml: 2 }}
        >
          Home
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        {/* Search */}
        <TextField
          placeholder="Search products…"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          sx={{
            backgroundColor: 'white',
            borderRadius: 1,
            width: { xs: 160, sm: 240, md: 320 },
            mr: 1,
          }}
        />

        {/* User avatar */}
        <IconButton color="inherit" onClick={handleMenuOpen} size="large">
          {initial ? (
            <Avatar
              sx={{
                bgcolor: '#D93025', // Gmail-style red
                color: '#ffffff',
                width: 32,
                height: 32,
                fontSize: 16,
              }}
            >
              {initial}
            </Avatar>
          ) : (
            <AccountCircleIcon fontSize="large" />
          )}
        </IconButton>

        {/* Dropdown */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            elevation: 4,
            sx: {
              mt: 1,
              borderRadius: 2,
              minWidth: 200,
              boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
              py: 0.5,
            },
          }}
          MenuListProps={{
            dense: true,
            sx: { p: 0 },
          }}
        >
          {/* user info */}
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {user?.fullName}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {user?.email}
            </Typography>
          </Box>
          <Divider sx={{ my: 0.5 }} />

          {/* Profile */}
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate('/profile');
            }}
            disableRipple
            sx={{
              px: 2,
              py: 1,
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>

          {/* Logout */}
          <MenuItem
            onClick={handleLogout}
            disableRipple
            sx={{
              px: 2,
              py: 1,
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
