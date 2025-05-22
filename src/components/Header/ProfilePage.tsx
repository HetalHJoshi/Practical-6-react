import React, { useState, type FormEvent } from 'react';
import {
  Container,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { getFromLocalStorage, setToLocalStorage } from '../../utils/storageUtils';
import type { User } from '../../types/User/types';

export const ProfilePage: React.FC = () => {
  const currentUser = getFromLocalStorage<User>('currentUser');
  const [fullName, setFullName] = useState(currentUser?.fullName ?? '');
  const [email, setEmail] = useState(currentUser?.email ?? '');
  const [isSaving, setIsSaving] = useState(false);
  const [snackbarState, setSnackbarState] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!currentUser) {
      setSnackbarState({
        open: true,
        message: 'No user found to update',
        severity: 'error',
      });
      return;
    }

    setIsSaving(true);
    try {
      const allUsers = getFromLocalStorage<User[]>('users') ?? [];
      const updatedUsers = allUsers.map(existingUser =>
        existingUser.email === currentUser.email
          ? { ...existingUser, fullName, email }
          : existingUser,
      );
      setToLocalStorage('users', updatedUsers);

      const updatedCurrentUser: User = { ...currentUser, fullName, email };
      setToLocalStorage('currentUser', updatedCurrentUser);

      setSnackbarState({
        open: true,
        message: 'Profile updated!',
        severity: 'success',
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setSnackbarState({
          open: true,
          message: error.message || 'Update failed',
          severity: 'error',
        });
      } else {
        setSnackbarState({
          open: true,
          message: 'Update failed',
          severity: 'error',
        });
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ bgcolor: '#D93025', width: 64, height: 64, mb: 2, fontSize: 32 }}>
            {fullName?.[0]?.toUpperCase() || '?'}
          </Avatar>
          <Typography variant="h5">{fullName}</Typography>
          <Typography variant="body2" color="text.secondary">
            {email}
          </Typography>
        </Box>

        <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
          <Stack spacing={2}>
            <TextField
              label="Full Name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
              required
            />
            <Button variant="contained" type="submit" disabled={isSaving}>
              {isSaving ? 'Saving…' : 'Save Changes'}
            </Button>
          </Stack>
        </Box>
      </Paper>

      <Snackbar
        open={snackbarState.open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => setSnackbarState(prevState => ({ ...prevState, open: false }))}
      >
        <Alert severity={snackbarState.severity} variant="filled">
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};
