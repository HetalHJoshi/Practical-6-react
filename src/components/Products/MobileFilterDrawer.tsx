// src/components/Products/MobileFilterDrawer.tsx
import React, { useMemo } from 'react';
import { Drawer, Box } from '@mui/material';
import { Sidebar } from '../Sidebar';
import type { SidebarFilters, SortOption } from '../Sidebar/types';
import type { Product } from '../../types/Product';

interface MobileFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  products: Product[];
  sortOption: SortOption;
  onSortChange: (opt: SortOption) => void;
  onFilterChange: (f: Partial<SidebarFilters>) => void;
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  open,
  onClose,
  products,
  sortOption,
  onSortChange,
  onFilterChange,
}) => {
  const categories = useMemo(() => [...new Set(products.map(p => p.category))], [products]);
  const brands = useMemo(() => [...new Set(products.map(p => p.brand))], [products]);

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 280, p: 2 }}>
        <Sidebar
          categories={categories}
          brands={brands}
          sortOption={sortOption}
          onSortChange={onSortChange}
          onFilterChange={onFilterChange}
        />
      </Box>
    </Drawer>
  );
};
