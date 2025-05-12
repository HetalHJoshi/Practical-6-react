// src/components/Layout.tsx
import React from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  // paths where we don't want header/footer
  const noLayoutPaths = ['/signin', '/signup'];
  const hideLayout = noLayoutPaths.includes(pathname);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {!hideLayout && <Header />}

      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      {!hideLayout && <Footer />}
    </Box>
  );
};
