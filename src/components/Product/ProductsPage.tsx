// import React, { useEffect, useState, useMemo, useCallback, useDeferredValue } from 'react';
// import axios from 'axios';
// import { Box, Button, useTheme, useMediaQuery } from '@mui/material';
// import { MainContent } from '../MainContent/MainContent';
// import { DesktopSidebar } from '../Product/DesktopSidebar';
// import { MobileFilterDrawer } from '../Product/MobileFilterDrawer';
// import type { Product } from '../../types/Product/Product';
// import { useSearch } from '../Header/SearchContext';
// import type { SidebarFilters, SortOption } from '../../types/Sidebar/types';

// const PAGE_SIZE = 20;

// export const ProductsPage: React.FC = () => {
//   const theme = useTheme();
//   const { searchTerm } = useSearch();
//   const deferredSearchTerm = useDeferredValue(searchTerm);
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   const [allProducts, setAllProducts] = useState<Product[]>([]);
//   const [filters, setFilters] = useState<SidebarFilters>({
//     categories: [],
//     brands: [],
//     priceRanges: [],
//     ratingRanges: [],
//   });
//   const [sortOption, setSortOption] = useState<SortOption>('nameAsc');
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setIsLoading(true);
//       try {
//         let response;
//         try {
//           response = await axios.get('https://dummyjson.com/products?limit=100');
//         } catch {
//           response = await axios.get('http://dummyjson.com/products?limit=100');
//         }

//         setAllProducts(response.data.products);
//       } catch (error) {
//         console.error('Error loading products', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const filteredProducts = useMemo(() => {
//     let filteredResult = allProducts;
//     const queryText = deferredSearchTerm.trim().toLowerCase();

//     if (queryText) {
//       filteredResult = filteredResult.filter(
//         product =>
//           product.title.toLowerCase().includes(queryText) ||
//           product.description.toLowerCase().includes(queryText),
//       );
//     }

//     if (filters.categories.length) {
//       filteredResult = filteredResult.filter(product =>
//         filters.categories.includes(product.category),
//       );
//     }

//     if (filters.brands.length) {
//       filteredResult = filteredResult.filter(product => filters.brands.includes(product.brand));
//     }

//     if (filters.priceRanges.length) {
//       filteredResult = filteredResult.filter(product =>
//         filters.priceRanges.some(
//           ([minPrice, maxPrice]) => product.price >= minPrice && product.price <= maxPrice,
//         ),
//       );
//     }

//     if (filters.ratingRanges.length) {
//       filteredResult = filteredResult.filter(product =>
//         filters.ratingRanges.some(
//           ([minRating, maxRating]) => product.rating >= minRating && product.rating <= maxRating,
//         ),
//       );
//     }

//     return filteredResult;
//   }, [allProducts, deferredSearchTerm, filters]);

//   const sortedProducts = useMemo(() => {
//     const sortedArray = [...filteredProducts];

//     switch (sortOption) {
//       case 'nameAsc':
//         sortedArray.sort((a, b) => a.title.localeCompare(b.title));
//         break;
//       case 'nameDesc':
//         sortedArray.sort((a, b) => b.title.localeCompare(a.title));
//         break;
//       case 'priceAsc':
//         sortedArray.sort((a, b) => a.price - b.price);
//         break;
//       case 'priceDesc':
//         sortedArray.sort((a, b) => b.price - a.price);
//         break;
//     }

//     return sortedArray;
//   }, [filteredProducts, sortOption]);

//   useEffect(() => {
//     const handleWindowScroll = () => {
//       if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200) {
//         setCurrentPage(previousPage =>
//           Math.min(previousPage + 1, Math.ceil(sortedProducts.length / PAGE_SIZE)),
//         );
//       }
//     };

//     window.addEventListener('scroll', handleWindowScroll);
//     return () => window.removeEventListener('scroll', handleWindowScroll);
//   }, [sortedProducts.length]);

//   const displayedProducts = useMemo(
//     () => sortedProducts.slice(0, currentPage * PAGE_SIZE),
//     [sortedProducts, currentPage],
//   );

//   const handleFilterChange = useCallback((changes: Partial<SidebarFilters>) => {
//     setFilters(previousFilters => ({ ...previousFilters, ...changes }));
//     setCurrentPage(1);
//     setIsDrawerOpen(false);
//   }, []);

//   const handleSortChange = useCallback((newSortOption: SortOption) => {
//     setSortOption(newSortOption);
//     setCurrentPage(1);
//     setIsDrawerOpen(false);
//   }, []);

//   return (
//     <Box display="flex">
//       {!selectedProduct && !isMobile && (
//         <DesktopSidebar
//           products={allProducts}
//           sortOption={sortOption}
//           onSortChange={handleSortChange}
//           onFilterChange={handleFilterChange}
//         />
//       )}

//       <Box sx={{ flex: 1 }}>
//         {isMobile && (
//           <Button variant="outlined" onClick={() => setIsDrawerOpen(true)} sx={{ mb: 2 }}>
//             Filter & Sort
//           </Button>
//         )}
//         <MainContent
//           products={selectedProduct ? [selectedProduct] : displayedProducts}
//           loading={isLoading}
//           selected={selectedProduct}
//           onSelect={setSelectedProduct}
//           onClose={() => setSelectedProduct(null)}
//         />
//       </Box>

//       {isMobile && (
//         <MobileFilterDrawer
//           open={isDrawerOpen}
//           onClose={() => setIsDrawerOpen(false)}
//           products={allProducts}
//           sortOption={sortOption}
//           onSortChange={handleSortChange}
//           onFilterChange={handleFilterChange}
//         />
//       )}
//     </Box>
//   );
// };

import React, { useEffect, useState, useMemo, useCallback, useDeferredValue } from 'react';
import axios from 'axios';
import { Box, Button, useTheme, useMediaQuery } from '@mui/material';
import { MainContent } from '../MainContent/MainContent';
import { DesktopSidebar } from '../Product/DesktopSidebar';
import { MobileFilterDrawer } from '../Product/MobileFilterDrawer';
import type { Product } from '../../types/Product/Product';
import { useSearch } from '../Header/SearchContext';
import type { SidebarFilters, SortOption } from '../../types/Sidebar/types';

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
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [throwError, setThrowError] = useState(false);

  if (throwError) {
    throw new Error('Intentional error for testing Error Boundary');
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let response;
        try {
          response = await axios.get('https://dummyjson.com/products?limit=100');
        } catch {
          response = await axios.get('http://dummyjson.com/products?limit=100');
        }

        setAllProducts(response.data.products);
      } catch (error) {
        console.error('Error loading products', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let filteredResult = allProducts;
    const queryText = deferredSearchTerm.trim().toLowerCase();

    if (queryText) {
      filteredResult = filteredResult.filter(
        product =>
          product.title.toLowerCase().includes(queryText) ||
          product.description.toLowerCase().includes(queryText),
      );
    }

    if (filters.categories.length) {
      filteredResult = filteredResult.filter(product =>
        filters.categories.includes(product.category),
      );
    }

    if (filters.brands.length) {
      filteredResult = filteredResult.filter(product => filters.brands.includes(product.brand));
    }

    if (filters.priceRanges.length) {
      filteredResult = filteredResult.filter(product =>
        filters.priceRanges.some(
          ([minPrice, maxPrice]) => product.price >= minPrice && product.price <= maxPrice,
        ),
      );
    }

    if (filters.ratingRanges.length) {
      filteredResult = filteredResult.filter(product =>
        filters.ratingRanges.some(
          ([minRating, maxRating]) => product.rating >= minRating && product.rating <= maxRating,
        ),
      );
    }

    return filteredResult;
  }, [allProducts, deferredSearchTerm, filters]);

  const sortedProducts = useMemo(() => {
    const sortedArray = [...filteredProducts];

    switch (sortOption) {
      case 'nameAsc':
        sortedArray.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'nameDesc':
        sortedArray.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'priceAsc':
        sortedArray.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        sortedArray.sort((a, b) => b.price - a.price);
        break;
    }

    return sortedArray;
  }, [filteredProducts, sortOption]);

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200) {
        setCurrentPage(prev => Math.min(prev + 1, Math.ceil(sortedProducts.length / PAGE_SIZE)));
      }
    };

    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [sortedProducts.length]);

  const displayedProducts = useMemo(
    () => sortedProducts.slice(0, currentPage * PAGE_SIZE),
    [sortedProducts, currentPage],
  );

  const handleFilterChange = useCallback((changes: Partial<SidebarFilters>) => {
    setFilters(prev => ({ ...prev, ...changes }));
    setCurrentPage(1);
    setIsDrawerOpen(false);
  }, []);

  const handleSortChange = useCallback((newSortOption: SortOption) => {
    setSortOption(newSortOption);
    setCurrentPage(1);
    setIsDrawerOpen(false);
  }, []);

  return (
    <Box display="flex">
      {!selectedProduct && !isMobile && (
        <DesktopSidebar
          products={allProducts}
          sortOption={sortOption}
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
        />
      )}

      <Box sx={{ flex: 1 }}>
        {isMobile && (
          <>
            <Button variant="outlined" onClick={() => setIsDrawerOpen(true)} sx={{ mb: 2 }}>
              Filter & Sort
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setThrowError(true)}
              sx={{ mb: 2 }}
            >
              Trigger Error
            </Button>
          </>
        )}

        {!isMobile && (
          <Button
            variant="contained"
            color="error"
            onClick={() => setThrowError(true)}
            sx={{ mb: 2 }}
          >
            Trigger Error
          </Button>
        )}

        <MainContent
          products={selectedProduct ? [selectedProduct] : displayedProducts}
          loading={isLoading}
          selected={selectedProduct}
          onSelect={setSelectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </Box>

      {isMobile && (
        <MobileFilterDrawer
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          products={allProducts}
          sortOption={sortOption}
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
        />
      )}
    </Box>
  );
};
