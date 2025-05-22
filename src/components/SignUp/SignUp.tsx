import React, { useState } from 'react';
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
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import type { User } from '../../types/User/types';
import { getFromLocalStorage, setToLocalStorage } from '../../utils/storageUtils';

const schema = z
  .object({
    id: z.string(),
    fullName: z.string().min(3, 'Full name must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type UserSignupFormFields = z.infer<typeof schema>;

export const Signup: React.FC = () => {
  const navigate = useNavigate();

  const defaultValue = {
    id: '',
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError,
  } = useForm<UserSignupFormFields>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: defaultValue,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const onSubmit = (data: UserSignupFormFields) => {
    const users = getFromLocalStorage<User[]>('users') || [];

    if (users.some(user => user.email === data.email)) {
      setError('email', {
        type: 'manual',
        message: 'Email is already registered',
      });
      return;
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    };

    users.push(newUser);

    setToLocalStorage('users', users);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
    navigate('/signin');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <Paper elevation={4} sx={{ p: 4, width: '100%' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Create Account
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2}>
              <TextField
                label="Full Name"
                fullWidth
                autoFocus
                {...register('fullName')}
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
              />

              <TextField
                label="Email"
                type="email"
                fullWidth
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
              />

              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                {...register('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={!isValid || isSubmitting}
                sx={{ mt: 1 }}
              >
                Sign Up
              </Button>
            </Stack>
          </Box>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Already have an account?{' '}
            <Link to="/signin" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Sign In
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
          Signup successful!
        </Alert>
      </Snackbar>
    </Container>
  );
};
