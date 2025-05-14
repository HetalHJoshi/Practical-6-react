// src/components/Header/UserMenu.tsx
import React, { useState, type MouseEvent } from 'react';
import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Typography,
  Divider,
  ListItemIcon,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const UserMenu: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/signin', { replace: true });
  };
  const initial = user?.fullName?.[0]?.toUpperCase() ?? '';

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen} size="large">
        {initial ? (
          <Avatar sx={{ bgcolor: '#D93025', color: '#fff', width: 32, height: 32, fontSize: 16 }}>
            {initial}
          </Avatar>
        ) : (
          <AccountCircleIcon fontSize="large" />
        )}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
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
        MenuListProps={{ dense: true, sx: { p: 0 } }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.fullName}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {user?.email}
          </Typography>
        </Box>
        <Divider sx={{ my: 0.5 }} />

        <MenuItem
          onClick={() => {
            handleClose();
            navigate('/profile');
          }}
          disableRipple
          sx={{ px: 2, py: 1, '&:hover': { bgcolor: 'action.hover' } }}
        >
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>

        <MenuItem
          onClick={handleLogout}
          disableRipple
          sx={{ px: 2, py: 1, '&:hover': { bgcolor: 'action.hover' } }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
