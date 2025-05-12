// src/pages/Signup.tsx

import React from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const schema = z
  .object({
    fullName: z.string().min(3, 'Full name must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirm: z.string(),
  })
  .refine(data => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

type FormData = z.infer<typeof schema>;

export const Signup: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange', // validate on every change
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    try {
      await signup({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });
      navigate('/signin');
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 8,
        }}
      >
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
                {...register('confirm')}
                error={!!errors.confirm}
                helperText={errors.confirm?.message}
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
    </Container>
  );
};
