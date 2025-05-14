// src/hooks/useProducts.ts
import { useState, useEffect, useMemo, useCallback, useDeferredValue } from 'react';
import { useSearch } from '../context/SearchContext';
import type { Product } from '../types/Product';
import type { SidebarFilters, SortOption } from '../components/Sidebar/types';

export function useProducts(pageSize: number) {
  const { searchTerm } = useSearch();
  const deferredSearchTerm = useDeferredValue(searchTerm);

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

  // 1. Fetch once
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

  // 2. Filter + search
  const filtered = useMemo(() => {
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

  // 3. Sort
  const sorted = useMemo(() => {
    const arr = [...filtered];
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
  }, [filtered, sortOption]);

  // 4. Infinite‐scroll pagination
  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200) {
        setPage(p => Math.min(p + 1, Math.ceil(sorted.length / pageSize)));
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [sorted.length, pageSize]);

  // 5. Visible slice
  const displayed = useMemo(() => sorted.slice(0, page * pageSize), [sorted, page, pageSize]);

  // 6. Handlers
  const handleFilterChange = useCallback((changes: Partial<SidebarFilters>) => {
    setFilters(prev => ({ ...prev, ...changes }));
    setPage(1);
  }, []);
  const handleSortChange = useCallback((opt: SortOption) => {
    setSortOption(opt);
    setPage(1);
  }, []);
  const clearSelection = useCallback(() => setSelected(null), []);

  return {
    allProducts,
    filters,
    sortOption,
    loading,
    selected,
    page,
    displayed,
    setSelected,
    clearSelection,
    handleFilterChange,
    handleSortChange,
  };
}
