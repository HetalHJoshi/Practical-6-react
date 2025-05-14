// src/components/Sidebar/PriceFilter.tsx
import React from 'react';
import { Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const priceOptions: { label: string; range: [number, number] }[] = [
  { label: '$0–50', range: [0, 50] },
  { label: '$51–100', range: [51, 100] },
  { label: '$101–200', range: [101, 200] },
  { label: '$201+', range: [201, Infinity] },
];

interface Props {
  selected: [number, number][];
  onChange: (range: [number, number], checked: boolean) => void;
}

export const PriceFilter: React.FC<Props> = ({ selected, onChange }) => (
  <>
    <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold', mb: 0.5 }}>
      Price
    </Typography>
    <FormGroup>
      {priceOptions.map(({ label, range }) => (
        <FormControlLabel
          key={label}
          control={
            <Checkbox
              checked={selected.some(r => r[0] === range[0] && r[1] === range[1])}
              onChange={e => onChange(range, e.target.checked)}
            />
          }
          label={label}
        />
      ))}
    </FormGroup>
  </>
);
