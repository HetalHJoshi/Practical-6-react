import React from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { SearchProvider } from '../Header/SearchContext';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
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
      {hideLayout ? (
        <Box component="main" sx={{ flexGrow: 1 }}>
          {children}
        </Box>
      ) : (
        <SearchProvider>
          <Header />

          <Box component="main" sx={{ flexGrow: 1 }}>
            {children}
          </Box>

          <Footer />
        </SearchProvider>
      )}
    </Box>
  );
};
