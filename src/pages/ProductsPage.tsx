// src/pages/ProductsPage.tsx
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Sidebar, type SidebarFilters } from '../components/Sidebar';
import { MainContent, type Product } from '../components/MainContent';

export const ProductsPage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<SidebarFilters>({
    categories: [],
    brands: [],
    priceRanges: [],
    ratingRanges: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [selected, setSelected] = useState<Product | null>(null);

  // Fetch once
  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=100')
      .then(res => res.json())
      .then(data => {
        setAllProducts(data.products);
        setFilteredProducts(data.products);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Re-apply filters on any change
  useEffect(() => {
    let result = allProducts;

    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category));
    }
    if (filters.brands.length > 0) {
      result = result.filter(p => filters.brands.includes(p.brand));
    }
    if (filters.priceRanges.length > 0) {
      result = result.filter(p =>
        filters.priceRanges.some(([min, max]) => p.price >= min && p.price <= max),
      );
    }
    if (filters.ratingRanges.length > 0) {
      result = result.filter(p => {
        const rating = (p as any).rating ?? 0;
        return filters.ratingRanges.some(([min, max]) => rating >= min && rating <= max);
      });
    }

    setFilteredProducts(result);
  }, [filters, allProducts]);

  return (
    <Box display="flex">
      {!selected && (
        <Sidebar
          categories={Array.from(new Set(allProducts.map(p => p.category)))}
          brands={Array.from(new Set(allProducts.map(p => p.brand)))}
          onFilterChange={changes => setFilters(prev => ({ ...prev, ...changes }))}
        />
      )}

      <MainContent
        products={selected ? [selected] : filteredProducts}
        loading={loading}
        selected={selected}
        onSelect={setSelected}
        onClose={() => setSelected(null)}
      />
    </Box>
  );
};
