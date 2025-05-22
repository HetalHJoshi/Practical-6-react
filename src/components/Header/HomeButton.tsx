import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const HomeButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Button
      color="inherit"
      onClick={() => navigate('/products')}
      sx={{ textTransform: 'none', ml: 2 }}
    >
      Home
    </Button>
  );
};
