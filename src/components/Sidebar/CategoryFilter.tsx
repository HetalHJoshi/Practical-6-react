// src/components/Sidebar/CategoryFilter.tsx
import React from 'react';
import { Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

interface Props {
  categories: string[];
  selected: string[];
  onChange: (cat: string, checked: boolean) => void;
}

export const CategoryFilter: React.FC<Props> = ({ categories, selected, onChange }) => (
  <>
    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
      Category
    </Typography>
    <FormGroup>
      {categories.map(cat => (
        <FormControlLabel
          key={cat}
          control={
            <Checkbox
              checked={selected.includes(cat)}
              onChange={e => onChange(cat, e.target.checked)}
            />
          }
          label={cat}
        />
      ))}
    </FormGroup>
  </>
);
