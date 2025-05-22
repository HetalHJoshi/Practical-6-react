import React from 'react';
import { Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

interface Props {
  categories: string[];
  selected: string[];
  onChange: (Category: string, checked: boolean) => void;
}

export const CategoryFilter: React.FC<Props> = ({ categories, selected, onChange }) => (
  <>
    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
      Category
    </Typography>
    <FormGroup>
      {categories.map(Category => (
        <FormControlLabel
          key={Category}
          control={
            <Checkbox
              checked={selected.includes(Category)}
              onChange={event => onChange(Category, event.target.checked)}
            />
          }
          label={Category}
        />
      ))}
    </FormGroup>
  </>
);
