// src/components/Product/ProductCard.tsx
import React from 'react';
import { Card, CardMedia, CardContent, Box, Typography, Rating } from '@mui/material';
import type { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product: p, onClick }) => {
  const discounted = (p.price * (1 - p.discountPercentage / 100)).toFixed(2);

  return (
    <Card
      onClick={onClick}
      sx={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <CardMedia component="img" height="140" image={p.thumbnail} alt={p.title} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" noWrap>
          {p.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {p.brand}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Rating value={p.rating} precision={0.1} readOnly size="small" />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {p.rating.toFixed(2)}
          </Typography>
        </Box>
        <Typography variant="body2" noWrap sx={{ mt: 1 }}>
          {p.description}
        </Typography>
        <Typography variant="body2">
          <strong>Price:</strong> ${p.price}
        </Typography>
        <Typography variant="body2">
          <strong>Disc:</strong> {p.discountPercentage}% → ${discounted}
        </Typography>
        <Typography variant="body2" color={p.stock > 0 ? 'success.main' : 'error.main'}>
          {p.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </Typography>
      </CardContent>
    </Card>
  );
};
