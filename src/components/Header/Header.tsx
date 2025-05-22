import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import { Logo } from './Logo';
import { HomeButton } from './HomeButton';
import { SearchBar } from './SearchBar';
import { UserMenu } from './UserMenu';

export const Header: React.FC = () => (
  <AppBar position="sticky" elevation={1}>
    <Toolbar>
      <Logo />
      <HomeButton />
      <Box sx={{ flexGrow: 1 }} />
      <SearchBar />
      <UserMenu />
    </Toolbar>
  </AppBar>
);
