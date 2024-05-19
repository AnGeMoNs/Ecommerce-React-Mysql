// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import ProductsList from './pages/ProductsList';
import ProductDetails from './pages/ProductDetails';
import CartView from './pages/CartView';
import OrderList from './pages/OrderList';
import OrderDetails from './pages/OrderDetails';
import PrivacyPolicy from './pages/PrivacyPolicy';
import SearchResults from './pages/SearchResults';
const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/search" element={<SearchResults />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/policy/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;





