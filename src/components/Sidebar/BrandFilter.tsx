import React from 'react';
import { Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

interface Props {
  brands: string[];
  selected: string[];
  onChange: (brand: string, isChecked: boolean) => void;
}

export const BrandFilter: React.FC<Props> = ({ brands, selected, onChange }) => (
  <>
    <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold', mb: 0.5 }}>
      Brand
    </Typography>
    <FormGroup>
      {brands
        .filter(brand => typeof brand === 'string' && brand.trim().length > 0)
        .map(brand => (
          <FormControlLabel
            key={brand}
            control={
              <Checkbox
                checked={selected.includes(brand)}
                onChange={event => onChange(brand, event.target.checked)}
              />
            }
            label={brand}
          />
        ))}
    </FormGroup>
  </>
);
