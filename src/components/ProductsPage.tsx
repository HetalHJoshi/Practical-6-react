import React, { useEffect, useState, useMemo, useCallback, useDeferredValue } from 'react';
import { Box, Button, useTheme, useMediaQuery, Drawer } from '@mui/material';
import { Sidebar, type SidebarFilters, type SortOption } from '../components/Sidebar';
import { MainContent, type Product } from '../components/MainContent';
import { useSearch } from '../context/SearchContext';

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

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products?limit=100');
        if (!res.ok) throw new Error();
        const data = await res.json();
        setAllProducts(data.products);
      } catch {
        const res = await fetch('http://dummyjson.com/products?limit=100');
        const data = await res.json();
        setAllProducts(data.products);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter
  const filteredProducts = useMemo(() => {
    let result = allProducts;
    const q = deferredSearchTerm.trim().toLowerCase();
    if (q) {
      result = result.filter(
        p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
      );
    }
    if (filters.categories.length)
      result = result.filter(p => filters.categories.includes(p.category));
    if (filters.brands.length) result = result.filter(p => filters.brands.includes(p.brand));
    if (filters.priceRanges.length) {
      result = result.filter(p =>
        filters.priceRanges.some(([min, max]) => p.price >= min && p.price <= max),
      );
    }
    if (filters.ratingRanges.length) {
      result = result.filter(p => {
        const rating = (p as any).rating ?? 0;
        return filters.ratingRanges.some(([min, max]) => rating >= min && rating <= max);
      });
    }
    return result;
  }, [allProducts, deferredSearchTerm, filters]);

  // Sort
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

  // Infinite scroll
  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200) {
        setPage(p => Math.min(p + 1, Math.ceil(sortedProducts.length / PAGE_SIZE)));
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [sortedProducts.length]);

  const displayed = useMemo(
    () => sortedProducts.slice(0, page * PAGE_SIZE),
    [sortedProducts, page],
  );

  const handleFilterChange = useCallback((changes: Partial<SidebarFilters>) => {
    setFilters(prev => ({ ...prev, ...changes }));
    setPage(1);
  }, []);

  const handleSortChange = useCallback((opt: SortOption) => {
    setSortOption(opt);
    setPage(1);
  }, []);

  return (
    <Box display="flex">
      {!selected && !isMobile && (
        <Box
          sx={{
            position: 'sticky',
            top: theme.mixins.toolbar.minHeight,
            alignSelf: 'flex-start',
          }}
        >
          <Sidebar
            categories={Array.from(new Set(allProducts.map(p => p.category)))}
            brands={Array.from(new Set(allProducts.map(p => p.brand)))}
            sortOption={sortOption}
            onSortChange={handleSortChange}
            onFilterChange={handleFilterChange}
          />
        </Box>
      )}

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

      {/* Drawer for mobile */}
      {isMobile && (
        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box sx={{ width: 280, p: 2 }}>
            <Sidebar
              categories={Array.from(new Set(allProducts.map(p => p.category)))}
              brands={Array.from(new Set(allProducts.map(p => p.brand)))}
              sortOption={sortOption}
              onSortChange={opt => {
                handleSortChange(opt);
                setDrawerOpen(false);
              }}
              onFilterChange={changes => {
                handleFilterChange(changes);
                setDrawerOpen(false);
              }}
            />
          </Box>
        </Drawer>
      )}
    </Box>
  );
};
