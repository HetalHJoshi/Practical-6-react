import React from 'react';
import { Card, CardMedia, CardContent, Box, Typography, Rating } from '@mui/material';
import type { Product } from '../../types/Product/Product';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const discounted = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);

  return (
    <Card
      onClick={onClick}
      sx={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <CardMedia component="img" height="140" image={product.thumbnail} alt={product.title} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" noWrap>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {product.brand}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Rating value={product.rating} precision={0.1} readOnly size="small" />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {product.rating.toFixed(2)}
          </Typography>
        </Box>
        <Typography variant="body2" noWrap sx={{ mt: 1 }}>
          {product.description}
        </Typography>
        <Typography variant="body2">
          <strong>Price:</strong> ${product.price}
        </Typography>
        <Typography variant="body2">
          <strong>Disc:</strong> {product.discountPercentage}% → ${discounted}
        </Typography>
        <Typography variant="body2" color={product.stock > 0 ? 'success.main' : 'error.main'}>
          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </Typography>
      </CardContent>
    </Card>
  );
};
