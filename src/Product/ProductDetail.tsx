// src/components/Product/ProductDetail.tsx
import React from 'react';
import { Box, Paper, IconButton, Typography, Rating } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { Product } from '../types/Product';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product: p, onClose }) => {
  const discounted = (p.price * (1 - p.discountPercentage / 100)).toFixed(2);

  return (
    <Box
      component="section"
      sx={{ position: 'relative', flexGrow: 1, py: 4, backgroundColor: 'background.default' }}
    >
      <Paper
        elevation={3}
        sx={{
          position: 'relative',
          p: { xs: 2, md: 4 },
          maxWidth: 900,
          mx: 'auto',
          borderRadius: 2,
        }}
      >
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          <Box flex={1}>
            <Box
              component="img"
              src={p.images[0]}
              alt={p.title}
              sx={{ width: '100%', height: 'auto', borderRadius: 2, objectFit: 'cover' }}
            />
          </Box>
          <Box flex={1}>
            <Typography variant="h4" gutterBottom>
              {p.title}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {p.brand}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Rating value={p.rating} precision={0.1} readOnly size="small" />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {p.rating.toFixed(1)}
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              {p.description}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Price:</strong> ${p.price}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Discount:</strong> {p.discountPercentage}%
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>After Discount:</strong> ${discounted}
            </Typography>
            <Typography
              variant="body1"
              color={p.stock > 0 ? 'success.main' : 'error.main'}
              sx={{ mt: 2 }}
            >
              {p.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
