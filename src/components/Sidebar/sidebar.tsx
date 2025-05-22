// import React, { useState, useEffect, useRef } from 'react';
// import { Box } from '@mui/material';
// import { SortControls } from './SortControls';
// import { CategoryFilter } from './CategoryFilters';
// import { BrandFilter } from './BrandFilter';
// import { PriceFilter } from './PriceFilter';
// import { RatingFilter } from './RatingFilter';
// import type { SidebarFilters, SortOption } from '../../types/Sidebar/types';

// interface Props {
//   categories: string[];
//   brands: string[];
//   onFilterChange: (changes: Partial<SidebarFilters>) => void;
//   sortOption: SortOption;
//   onSortChange: (opt: SortOption) => void;
// }

// export const Sidebar: React.FC<Props> = ({
//   categories,
//   brands,
//   onFilterChange,
//   sortOption,
//   onSortChange,
// }) => {
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
//   const [selectedPriceRanges, setSelectedPriceRanges] = useState<[number, number][]>([]);
//   const [selectedRatingRanges, setSelectedRatingRanges] = useState<[number, number][]>([]);
//   const isFirstRender = useRef(true);

//   useEffect(() => {
//     if (isFirstRender.current) {
//       isFirstRender.current = false;
//       return;
//     }
//     onFilterChange({
//       categories: selectedCategories,
//       brands: selectedBrands,
//       priceRanges: selectedPriceRanges,
//       ratingRanges: selectedRatingRanges,
//     });
//   }, [
//     selectedCategories,
//     selectedBrands,
//     selectedPriceRanges,
//     selectedRatingRanges,
//     onFilterChange,
//   ]);

//   const handleCategoryChange = (category: string, isChecked: boolean) =>
//     setSelectedCategories(previous =>
//       isChecked
//         ? [...previous, category]
//         : previous.filter(existingCategory => existingCategory !== category),
//     );

//   const handleBrandChange = (brand: string, isChecked: boolean) =>
//     setSelectedBrands(previous =>
//       isChecked ? [...previous, brand] : previous.filter(existingBrand => existingBrand !== brand),
//     );

//   const handlePriceRangeChange = (priceRange: [number, number], isChecked: boolean) =>
//     setSelectedPriceRanges(previous =>
//       isChecked
//         ? [...previous, priceRange]
//         : previous.filter(
//             existingRange =>
//               !(existingRange[0] === priceRange[0] && existingRange[1] === priceRange[1]),
//           ),
//     );

//   const handleRatingRangeChange = (ratingRange: [number, number], isChecked: boolean) =>
//     setSelectedRatingRanges(previous =>
//       isChecked
//         ? [...previous, ratingRange]
//         : previous.filter(
//             existingRange =>
//               !(existingRange[0] === ratingRange[0] && existingRange[1] === ratingRange[1]),
//           ),
//     );

//   return (
//     <Box
//       sx={{
//         width: 240,
//         p: 2,
//         borderRight: theme => `1px solid ${theme.palette.divider}`,
//         flexShrink: 0,
//       }}
//     >
//       <SortControls sortOption={sortOption} onSortChange={onSortChange} />

//       <Box sx={{ mt: 2 }}>
//         <CategoryFilter
//           categories={categories}
//           selected={selectedCategories}
//           onChange={handleCategoryChange}
//         />

//         <BrandFilter brands={brands} selected={selectedBrands} onChange={handleBrandChange} />

//         <PriceFilter selected={selectedPriceRanges} onChange={handlePriceRangeChange} />

//         <RatingFilter selected={selectedRatingRanges} onChange={handleRatingRangeChange} />
//       </Box>
//     </Box>
//   );
// };

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box } from '@mui/material';
import { SortControls } from './SortControls';
import { CategoryFilter } from './CategoryFilters';
import { BrandFilter } from './BrandFilter';
import { PriceFilter } from './PriceFilter';
import { RatingFilter } from './RatingFilter';
import type { SidebarFilters, SortOption } from '../../types/Sidebar/types';

interface Props {
  categories: string[];
  brands: string[];
  onFilterChange: (changes: Partial<SidebarFilters>) => void;
  sortOption: SortOption;
  onSortChange: (opt: SortOption) => void;
}

export const Sidebar: React.FC<Props> = ({
  categories,
  brands,
  onFilterChange,
  sortOption,
  onSortChange,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<[number, number][]>([]);
  const [selectedRatingRanges, setSelectedRatingRanges] = useState<[number, number][]>([]);
  const isFirstRender = useRef(true);

  const updateURLParams = useCallback(() => {
    const params = new URLSearchParams();

    if (selectedCategories.length > 0) {
      params.set('categories', selectedCategories.join(','));
    }
    if (selectedBrands.length > 0) {
      params.set('brands', selectedBrands.join(','));
    }
    if (selectedPriceRanges.length > 0) {
      params.set('priceRanges', selectedPriceRanges.map(r => r.join('-')).join(','));
    }
    if (selectedRatingRanges.length > 0) {
      params.set('ratingRanges', selectedRatingRanges.map(r => r.join('-')).join(','));
    }

    params.set('sort', sortOption);

    window.history.pushState({}, '', '?' + params.toString());
  }, [selectedCategories, selectedBrands, selectedPriceRanges, selectedRatingRanges, sortOption]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    onFilterChange({
      categories: selectedCategories,
      brands: selectedBrands,
      priceRanges: selectedPriceRanges,
      ratingRanges: selectedRatingRanges,
    });

    updateURLParams();
  }, [
    selectedCategories,
    selectedBrands,
    selectedPriceRanges,
    selectedRatingRanges,
    sortOption,
    onFilterChange,
    updateURLParams,
  ]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const categoriesFromUrl = params.get('categories')?.split(',') || [];
    const brandsFromUrl = params.get('brands')?.split(',') || [];
    const priceRangesFromUrl =
      params
        .get('priceRanges')
        ?.split(',')
        .map((range: string) => {
          const [min, max] = range.split('-').map(Number);
          return [min, max] as [number, number];
        }) || [];
    const ratingRangesFromUrl =
      params
        .get('ratingRanges')
        ?.split(',')
        .map((range: string) => {
          const [min, max] = range.split('-').map(Number);
          return [min, max] as [number, number];
        }) || [];

    setSelectedCategories(categoriesFromUrl);
    setSelectedBrands(brandsFromUrl);
    setSelectedPriceRanges(priceRangesFromUrl);
    setSelectedRatingRanges(ratingRangesFromUrl);

    onFilterChange({
      categories: categoriesFromUrl,
      brands: brandsFromUrl,
      priceRanges: priceRangesFromUrl,
      ratingRanges: ratingRangesFromUrl,
    });

    const sortFromUrl = params.get('sort') as SortOption;
    if (sortFromUrl) {
      onSortChange(sortFromUrl);
    }
  }, [onFilterChange, onSortChange]);

  const handleCategoryChange = (category: string, isChecked: boolean) =>
    setSelectedCategories(previous =>
      isChecked
        ? [...previous, category]
        : previous.filter(existingCategory => existingCategory !== category),
    );

  const handleBrandChange = (brand: string, isChecked: boolean) =>
    setSelectedBrands(previous =>
      isChecked ? [...previous, brand] : previous.filter(existingBrand => existingBrand !== brand),
    );

  const handlePriceRangeChange = (priceRange: [number, number], isChecked: boolean) =>
    setSelectedPriceRanges(previous =>
      isChecked
        ? [...previous, priceRange]
        : previous.filter(
            existingRange =>
              !(existingRange[0] === priceRange[0] && existingRange[1] === priceRange[1]),
          ),
    );

  const handleRatingRangeChange = (ratingRange: [number, number], isChecked: boolean) =>
    setSelectedRatingRanges(previous =>
      isChecked
        ? [...previous, ratingRange]
        : previous.filter(
            existingRange =>
              !(existingRange[0] === ratingRange[0] && existingRange[1] === ratingRange[1]),
          ),
    );

  return (
    <Box
      sx={{
        width: 240,
        p: 2,
        borderRight: theme => `1px solid ${theme.palette.divider}`,
        flexShrink: 0,
      }}
    >
      <SortControls sortOption={sortOption} onSortChange={onSortChange} />

      <Box sx={{ mt: 2 }}>
        <CategoryFilter
          categories={categories}
          selected={selectedCategories}
          onChange={handleCategoryChange}
        />

        <BrandFilter brands={brands} selected={selectedBrands} onChange={handleBrandChange} />

        <PriceFilter selected={selectedPriceRanges} onChange={handlePriceRangeChange} />

        <RatingFilter selected={selectedRatingRanges} onChange={handleRatingRangeChange} />
      </Box>
    </Box>
  );
};
