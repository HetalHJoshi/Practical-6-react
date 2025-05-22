import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Logo: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{ cursor: 'pointer' }}
      onClick={() => navigate('/products')}
    >
      <Box component="img" src="/NovaMart1.svg" alt="NovaMart" sx={{ height: 40, width: 'auto' }} />
    </Box>
  );
};
