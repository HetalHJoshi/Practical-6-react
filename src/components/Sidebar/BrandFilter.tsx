// src/components/Sidebar/BrandFilter.tsx
import React from 'react';
import { Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

interface Props {
  brands: string[];
  selected: string[];
  onChange: (br: string, checked: boolean) => void;
}

export const BrandFilter: React.FC<Props> = ({ brands, selected, onChange }) => (
  <>
    <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold', mb: 0.5 }}>
      Brand
    </Typography>
    <FormGroup>
      {brands.map(br => (
        <FormControlLabel
          key={br}
          control={
            <Checkbox
              checked={selected.includes(br)}
              onChange={e => onChange(br, e.target.checked)}
            />
          }
          label={br}
        />
      ))}
    </FormGroup>
  </>
);
