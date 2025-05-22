import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { getFromLocalStorage, setToLocalStorage } from '../../utils/storageUtils';
import { useAuth } from '../auth/AuthContext';
import type { User } from '../../types/User/types';

interface UserLoginFormFields {
  email: string;
  password: string;
}

export const Signin: React.FC = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserLoginFormFields>();

  const [pendingUser, setPendingUser] = useState<User | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const onSubmit = (data: UserLoginFormFields) => {
    try {
      const users = getFromLocalStorage<User[]>('users') || [];
      const found = users.find(
        user => user.email === data.email && user.password === data.password,
      );
      if (!found) throw new Error('Invalid email or password');

      setPendingUser(found);
      setOpenSnackbar(true);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  const handleSnackbarClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;

    if (pendingUser) {
      setToLocalStorage('currentUser', pendingUser);
      setUser(pendingUser);
      setPendingUser(null);
    }

    setOpenSnackbar(false);
    navigate('/products', { replace: true });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <Paper elevation={4} sx={{ p: 4, width: '100%' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Sign In
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                autoFocus
                {...register('email', { required: true })}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                {...register('password', { required: true })}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isSubmitting}
                sx={{ mt: 1 }}
              >
                Sign In
              </Button>
            </Stack>
          </Box>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Sign-in successful!
        </Alert>
      </Snackbar>
    </Container>
  );
};
