// src/components/Header.tsx
import React from 'react';
import { AppBar, Toolbar, TextField, Box } from '@mui/material';

export const Header: React.FC = () => (
  <AppBar position="static">
    <Toolbar sx={{ justifyContent: 'space-between' }}>
      {/* Logo on the left */}
      <Box display="flex" alignItems="center">
        <Box
          component="img"
          src="/NovaMart1.svg"
          alt="NovaMart"
          sx={{
            height: 40, // fits nicely in a 64px AppBar
            width: 'auto', // preserve original SVG aspect
            mr: 2,
          }}
        />
      </Box>

      {/* Search at the far right */}
      <TextField
        placeholder="Search products..."
        variant="outlined"
        size="small"
        onChange={() => {
          // your search handler here
        }}
        sx={{
          backgroundColor: 'white',
          borderRadius: 1,
          width: { xs: 200, sm: 300, md: 400 },
        }}
      />
    </Toolbar>
  </AppBar>
);
