import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

export type SortOption = 'nameAsc' | 'nameDesc' | 'priceAsc' | 'priceDesc';

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
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
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
  const isFirstUpdate = useRef(true);

  const priceOptions: { label: string; range: [number, number] }[] = [
    { label: '$0–50', range: [0, 50] },
    { label: '$51–100', range: [51, 100] },
    { label: '$101–200', range: [101, 200] },
    { label: '$201+', range: [201, Infinity] },
  ];
  const ratingOptions: { label: string; range: [number, number] }[] = [
    { label: '1★ & up', range: [1, Infinity] },
    { label: '2★ & up', range: [2, Infinity] },
    { label: '3★ & up', range: [3, Infinity] },
    { label: '4★ & up', range: [4, Infinity] },
    { label: '5★ & up', range: [5, Infinity] },
  ];

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
      {/* Sort controls */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
        Sort By
      </Typography>
      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel id="sort-label">Option</InputLabel>
        <Select
          labelId="sort-label"
          label="Option"
          value={sortOption}
          onChange={e => onSortChange(e.target.value as SortOption)}
        >
          <MenuItem value="nameAsc">Name A → Z</MenuItem>
          <MenuItem value="nameDesc">Name Z → A</MenuItem>
          <MenuItem value="priceAsc">Price Low → High</MenuItem>
          <MenuItem value="priceDesc">Price High → Low</MenuItem>
        </Select>
      </FormControl>

      {/* Filters Section Title */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
        Filters
      </Typography>

      {/* Category */}
      <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
        Category
      </Typography>
      <FormGroup>
        {categories.map((cat, idx) => (
          <FormControlLabel
            key={`${cat}-${idx}`}
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
      <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold', mb: 0.5 }}>
        Brand
      </Typography>
      <FormGroup>
        {brands.map((br, idx) => (
          <FormControlLabel
            key={`${br}-${idx}`}
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
      <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold', mb: 0.5 }}>
        Price
      </Typography>
      <FormGroup>
        {priceOptions.map(({ label, range }, idx) => (
          <FormControlLabel
            key={`${label}-${idx}`}
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
      <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold', mb: 0.5 }}>
        Rating
      </Typography>
      <FormGroup>
        {ratingOptions.map(({ label, range }, idx) => (
          <FormControlLabel
            key={`${label}-${idx}`}
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
