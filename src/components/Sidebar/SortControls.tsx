import React from 'react';
import { Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import type { SortOption } from '../../types/Sidebar/types';

interface Props {
  sortOption: SortOption;
  onSortChange: (opt: SortOption) => void;
}

export const SortControls: React.FC<Props> = ({ sortOption, onSortChange }) => (
  <>
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
  </>
);
