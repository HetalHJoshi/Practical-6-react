import React from 'react';
import { Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const ratingOptions: { label: string; range: [number, number] }[] = [
  { label: '1★ & up', range: [1, Infinity] },
  { label: '2★ & up', range: [2, Infinity] },
  { label: '3★ & up', range: [3, Infinity] },
  { label: '4★ & up', range: [4, Infinity] },
  { label: '5★ & up', range: [5, Infinity] },
];

interface Props {
  selected: [number, number][];
  onChange: (range: [number, number], checked: boolean) => void;
}

export const RatingFilter: React.FC<Props> = ({ selected, onChange }) => (
  <>
    <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold', mb: 0.5 }}>
      Rating
    </Typography>
    <FormGroup>
      {ratingOptions.map(({ label, range }) => (
        <FormControlLabel
          key={label}
          control={
            <Checkbox
              checked={selected.some(
                selectedRange => selectedRange[0] === range[0] && selectedRange[1] === range[1],
              )}
              onChange={changeEvent => onChange(range, changeEvent.target.checked)}
            />
          }
          label={label}
        />
      ))}
    </FormGroup>
  </>
);
