// src/components/Sidebar.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

export interface SidebarFilters {
  categories: string[];
  brands: string[];
  priceRanges: [number, number][];
  ratingRanges: [number, number][];
}

interface SidebarProps {
  categories: string[];
  brands: string[];
  onFilterChange: (changes: Partial<SidebarFilters>) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ categories, brands, onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<[number, number][]>([]);
  const [selectedRatingRanges, setSelectedRatingRanges] = useState<[number, number][]>([]);
  const isFirstUpdate = useRef(true);

  // static options for price & rating
  const priceOptions: { label: string; range: [number, number] }[] = [
    { label: '$0–50', range: [0, 50] },
    { label: '$51–100', range: [51, 100] },
    { label: '$101–200', range: [101, 200] },
    { label: '$201+', range: [201, Infinity] },
  ];
  const ratingOptions: { label: string; range: [number, number] }[] = [
    { label: '1★ & up', range: [1, 5] },
    { label: '2★ & up', range: [2, 5] },
    { label: '3★ & up', range: [3, 5] },
    { label: '4★ & up', range: [4, 5] },
    { label: '5★', range: [5, 5] },
  ];

  // emit new filters whenever anything changes (skip initial mount)
  useEffect(() => {
    if (isFirstUpdate.current) {
      isFirstUpdate.current = false;
      return;
    }
    onFilterChange({
      categories: selectedCategories,
      brands: selectedBrands,
      priceRanges: selectedPriceRanges,
      ratingRanges: selectedRatingRanges,
    });
  }, [
    selectedCategories,
    selectedBrands,
    selectedPriceRanges,
    selectedRatingRanges,
    onFilterChange,
  ]);

  return (
    <Box
      sx={{
        width: 240,
        p: 2,
        borderRight: theme => `1px solid ${theme.palette.divider}`,
        flexShrink: 0,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>

      {/* Category */}
      <Typography variant="subtitle1">Category</Typography>
      <FormGroup>
        {categories.map(cat => (
          <FormControlLabel
            key={cat}
            control={
              <Checkbox
                checked={selectedCategories.includes(cat)}
                onChange={e =>
                  setSelectedCategories(prev =>
                    e.target.checked ? [...prev, cat] : prev.filter(c => c !== cat),
                  )
                }
              />
            }
            label={cat}
          />
        ))}
      </FormGroup>

      {/* Brand */}
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Brand
      </Typography>
      <FormGroup>
        {brands.map(br => (
          <FormControlLabel
            key={br}
            control={
              <Checkbox
                checked={selectedBrands.includes(br)}
                onChange={e =>
                  setSelectedBrands(prev =>
                    e.target.checked ? [...prev, br] : prev.filter(b => b !== br),
                  )
                }
              />
            }
            label={br}
          />
        ))}
      </FormGroup>

      {/* Price */}
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Price
      </Typography>
      <FormGroup>
        {priceOptions.map(({ label, range }) => (
          <FormControlLabel
            key={label}
            control={
              <Checkbox
                checked={selectedPriceRanges.some(r => r[0] === range[0] && r[1] === range[1])}
                onChange={e =>
                  setSelectedPriceRanges(prev =>
                    e.target.checked
                      ? [...prev, range]
                      : prev.filter(r => !(r[0] === range[0] && r[1] === range[1])),
                  )
                }
              />
            }
            label={label}
          />
        ))}
      </FormGroup>

      {/* Rating */}
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Rating
      </Typography>
      <FormGroup>
        {ratingOptions.map(({ label, range }) => (
          <FormControlLabel
            key={label}
            control={
              <Checkbox
                checked={selectedRatingRanges.some(r => r[0] === range[0] && r[1] === range[1])}
                onChange={e =>
                  setSelectedRatingRanges(prev =>
                    e.target.checked
                      ? [...prev, range]
                      : prev.filter(r => !(r[0] === range[0] && r[1] === range[1])),
                  )
                }
              />
            }
            label={label}
          />
        ))}
      </FormGroup>
    </Box>
  );
};
