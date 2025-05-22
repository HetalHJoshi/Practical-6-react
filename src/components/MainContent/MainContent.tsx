import React from 'react';
import type { Product } from '../../types/Product/Product';
import { Loading } from '../Product/Loading';
import { ProductGrid } from '../Product/ProductGrid';
import { ProductDetail } from '../Product/ProductDetail';

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
  if (loading) return <Loading />;
  if (selected) return <ProductDetail product={selected} onClose={onClose} />;
  return <ProductGrid products={products} onSelect={onSelect} />;
};
