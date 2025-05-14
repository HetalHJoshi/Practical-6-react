// src/pages/ProductsPage.tsx
import React, { useEffect, useState, useMemo, useCallback, useDeferredValue } from 'react';
import { Box, Button, useTheme, useMediaQuery } from '@mui/material';
import { MainContent } from '../components/MainContent';
import { DesktopSidebar } from '../components/Products/DesktopSidebar';
import { MobileFilterDrawer } from '../components/Products/MobileFilterDrawer';
import type { Product } from '../types/Product';
import { useSearch } from '../context/SearchContext';
import type { SidebarFilters, SortOption } from '../components/Sidebar/types';

const PAGE_SIZE = 20;

export const ProductsPage: React.FC = () => {
  const theme = useTheme();
  const { searchTerm } = useSearch();
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<SidebarFilters>({
    categories: [],
    brands: [],
    priceRanges: [],
    ratingRanges: [],
  });
  const [sortOption, setSortOption] = useState<SortOption>('nameAsc');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Product | null>(null);
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Fetch products once
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://dummyjson.com/products?limit=100');
        const data = res.ok
          ? await res.json()
          : await (await fetch('http://dummyjson.com/products?limit=100')).json();
        setAllProducts(data.products);
      } catch (err) {
        console.error('Error loading products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Apply search + filter
  const filteredProducts = useMemo(() => {
    let result = allProducts;
    const q = deferredSearchTerm.trim().toLowerCase();
    if (q) {
      result = result.filter(
        p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
      );
    }
    if (filters.categories.length) {
      result = result.filter(p => filters.categories.includes(p.category));
    }
    if (filters.brands.length) {
      result = result.filter(p => filters.brands.includes(p.brand));
    }
    if (filters.priceRanges.length) {
      result = result.filter(p =>
        filters.priceRanges.some(([min, max]) => p.price >= min && p.price <= max),
      );
    }
    if (filters.ratingRanges.length) {
      result = result.filter(p =>
        filters.ratingRanges.some(([min, max]) => p.rating >= min && p.rating <= max),
      );
    }
    return result;
  }, [allProducts, deferredSearchTerm, filters]);

  // Apply sort
  const sortedProducts = useMemo(() => {
    const arr = [...filteredProducts];
    switch (sortOption) {
      case 'nameAsc':
        arr.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'nameDesc':
        arr.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'priceAsc':
        arr.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        arr.sort((a, b) => b.price - a.price);
        break;
    }
    return arr;
  }, [filteredProducts, sortOption]);

  // Infinite-scroll pagination
  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200) {
        setPage(p => Math.min(p + 1, Math.ceil(sortedProducts.length / PAGE_SIZE)));
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [sortedProducts.length]);

  // Slice out only the current “page”
  const displayed = useMemo(
    () => sortedProducts.slice(0, page * PAGE_SIZE),
    [sortedProducts, page],
  );

  // Handlers for filter & sort (reset page & close drawer on mobile)
  const handleFilterChange = useCallback((changes: Partial<SidebarFilters>) => {
    setFilters(prev => ({ ...prev, ...changes }));
    setPage(1);
    setDrawerOpen(false);
  }, []);
  const handleSortChange = useCallback((opt: SortOption) => {
    setSortOption(opt);
    setPage(1);
    setDrawerOpen(false);
  }, []);

  return (
    <Box display="flex">
      {/* Desktop sidebar (only when no product is selected) */}
      {!selected && !isMobile && (
        <DesktopSidebar
          products={allProducts}
          sortOption={sortOption}
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
        />
      )}

      {/* Main content */}
      <Box sx={{ flex: 1 }}>
        {isMobile && (
          <Button variant="outlined" onClick={() => setDrawerOpen(true)} sx={{ mb: 2 }}>
            Filter & Sort
          </Button>
        )}
        <MainContent
          products={selected ? [selected] : displayed}
          loading={loading}
          selected={selected}
          onSelect={setSelected}
          onClose={() => setSelected(null)}
        />
      </Box>

      {/* Mobile drawer */}
      {isMobile && (
        <MobileFilterDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          products={allProducts}
          sortOption={sortOption}
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
        />
      )}
    </Box>
  );
};
