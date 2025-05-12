// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import { Signup } from './pages/Signup';
import { Signin } from './pages/signIn';
import { ProductsPage } from './pages/ProductsPage';
import { ProtectedRoute } from './components/ProtectedRoute';

const App: React.FC = () => (
  <AuthProvider>
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* public */}
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          {/* protected */}
          <Route path="/products" element={<ProtectedRoute />}>
            <Route index element={<ProductsPage />} />
          </Route>

          {/* fallback */}
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
