import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export const Loading: React.FC = () => (
  <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1} mt={4}>
    <CircularProgress />
  </Box>
);
