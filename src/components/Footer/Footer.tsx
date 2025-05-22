import React from 'react';
import { Box, Container, Typography, Link, Toolbar } from '@mui/material';

export const Footer: React.FC = () => (
  <Box
    component="footer"
    sx={{
      bgcolor: 'grey.100',
      mt: 'auto',
      py: 2,
      borderTop: theme => `1px solid ${theme.palette.divider}`,
    }}
  >
    <Container maxWidth="lg">
      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} NovaMart. All rights reserved.
        </Typography>

        <Box>
          <Link href="/privacy" color="text.secondary" underline="hover" sx={{ mx: 1 }}>
            Privacy Policy
          </Link>
          <Link href="/terms" color="text.secondary" underline="hover" sx={{ mx: 1 }}>
            Terms of Service
          </Link>
          <Link href="/contact" color="text.secondary" underline="hover" sx={{ mx: 1 }}>
            Contact Us
          </Link>
        </Box>
      </Toolbar>
    </Container>
  </Box>
);
