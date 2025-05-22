import React, { useMemo } from 'react';
import { Box, useTheme } from '@mui/material';
import { Sidebar } from '../Sidebar/sidebar';
import type { SidebarFilters, SortOption } from '../../types/Sidebar/types';
import type { Product } from '../../types/Product/Product';

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

  const categories = useMemo(
    () => [...new Set(products.map(product => product.category))],
    [products],
  );
  const brands = useMemo(() => [...new Set(products.map(product => product.brand))], [products]);

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
