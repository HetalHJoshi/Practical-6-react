import React from 'react';
import { Box } from '@mui/material';
import { ProductCard } from './ProductCard';
import type { Product } from '../../types/Product/Product';

interface ProductGridProps {
  products: Product[];
  onSelect: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onSelect }) => (
  <Box flexGrow={1} p={2}>
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 2,
      }}
    >
      {products.map(product => (
        <ProductCard key={product.id} product={product} onClick={() => onSelect(product)} />
      ))}
    </Box>
  </Box>
);
