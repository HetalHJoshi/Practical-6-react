import React from 'react';
import {
  Box,
  Paper,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  CircularProgress,
  Rating,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface MainContentProps {
  products: Product[];
  loading: boolean;
  selected: Product | null;
  onSelect: (product: Product) => void;
  onClose: () => void;
}

export const MainContent: React.FC<MainContentProps> = ({
  products,
  loading,
  selected,
  onSelect,
  onClose,
}) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1} mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (selected) {
    const p = selected;
    const discounted = (p.price * (1 - p.discountPercentage / 100)).toFixed(2);

    return (
      <Box
        component="section"
        sx={{ position: 'relative', flexGrow: 1, py: 4, backgroundColor: 'background.default' }}
      >
        <Paper
          elevation={3}
          sx={{
            position: 'relative',
            p: { xs: 2, md: 4 },
            maxWidth: 900,
            mx: 'auto',
            borderRadius: 2,
          }}
        >
          <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <CloseIcon />
          </IconButton>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            <Box flex={1}>
              <Box
                component="img"
                src={p.images[0]}
                alt={p.title}
                sx={{ width: '100%', height: 'auto', borderRadius: 2, objectFit: 'cover' }}
              />
            </Box>
            <Box flex={1}>
              <Typography variant="h4" gutterBottom>
                {p.title}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {p.brand}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Rating value={p.rating} precision={0.1} readOnly size="small" />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {p.rating.toFixed(1)}
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                {p.description}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Price:</strong> ${p.price}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Discount:</strong> {p.discountPercentage}%
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>After Discount:</strong> ${discounted}
              </Typography>
              <Typography
                variant="body1"
                color={p.stock > 0 ? 'success.main' : 'error.main'}
                sx={{ mt: 2 }}
              >
                {p.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    );
  }

  return (
    <Box flexGrow={1} p={2}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 2,
        }}
      >
        {products.map(p => {
          const discounted = (p.price * (1 - p.discountPercentage / 100)).toFixed(2);
          return (
            <Card
              key={p.id}
              onClick={() => onSelect(p)}
              sx={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <CardMedia component="img" height="140" image={p.thumbnail} alt={p.title} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" noWrap>
                  {p.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {p.brand}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Rating value={p.rating} precision={0.1} readOnly size="small" />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {p.rating.toFixed(2)}
                  </Typography>
                </Box>
                <Typography variant="body2" noWrap sx={{ mt: 1 }}>
                  {p.description}
                </Typography>
                <Typography variant="body2">
                  <strong>Price:</strong> ${p.price}
                </Typography>
                <Typography variant="body2">
                  <strong>Disc:</strong> {p.discountPercentage}% → ${discounted}
                </Typography>
                <Typography variant="body2" color={p.stock > 0 ? 'success.main' : 'error.main'}>
                  {p.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};
