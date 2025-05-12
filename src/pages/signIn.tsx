// src/pages/Signin.tsx

import React from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password required'),
});

type FormData = z.infer<typeof schema>;

export const Signin: React.FC = () => {
  const { login } = useAuth();
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
      await login(data.email, data.password);
      navigate('/products'); // navigate to protected home
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
            Sign In
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                autoFocus
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

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={!isValid || isSubmitting}
                sx={{ mt: 1 }}
              >
                Sign In
              </Button>
            </Stack>
          </Box>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Don’t have an account?{' '}
            <Link to="/signup" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};
