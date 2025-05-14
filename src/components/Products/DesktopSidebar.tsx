// src/components/Products/DesktopSidebar.tsx
import React, { useMemo } from 'react';
import { Box, useTheme } from '@mui/material';
import { Sidebar } from '../Sidebar';
import type { SidebarFilters, SortOption } from '../Sidebar/types';
import type { Product } from '../../types/Product';

interface DesktopSidebarProps {
  products: Product[];
  sortOption: SortOption;
  onSortChange: (opt: SortOption) => void;
  onFilterChange: (f: Partial<SidebarFilters>) => void;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  products,
  sortOption,
  onSortChange,
  onFilterChange,
}) => {
  const theme = useTheme();

  const categories = useMemo(() => [...new Set(products.map(p => p.category))], [products]);
  const brands = useMemo(() => [...new Set(products.map(p => p.brand))], [products]);

  return (
    <Box
      sx={{
        position: 'sticky',
        top: theme.mixins.toolbar.minHeight,
        alignSelf: 'flex-start',
      }}
    >
      <Sidebar
        categories={categories}
        brands={brands}
        sortOption={sortOption}
        onSortChange={onSortChange}
        onFilterChange={onFilterChange}
      />
    </Box>
  );
};
