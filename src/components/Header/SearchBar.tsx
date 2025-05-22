import React from 'react';
import { TextField } from '@mui/material';
import { useSearch } from '../Header/SearchContext';

export const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  return (
    <TextField
      placeholder="Search products…"
      variant="outlined"
      size="small"
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      sx={{
        backgroundColor: 'white',
        borderRadius: 1,
        width: { xs: 160, sm: 240, md: 320 },
        mr: 1,
      }}
    />
  );
};
