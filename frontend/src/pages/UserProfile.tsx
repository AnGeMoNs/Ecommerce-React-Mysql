// src/pages/UserProfile.tsx
import React from 'react';
import { useUserContext } from '../context/UserContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../assets/css/profile.css';
import '../assets/css/navbar.css';
import '../assets/css/footer.css';

const UserProfile: React.FC = () => {
  const { user } = useUserContext();

  if (!user) {
    return (
      <div>
        <Navbar />
        <p>No estás autenticado. Por favor inicia sesión.</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      <Navbar />
      <div className="user-profile-sub-navbar">
        <a href="/orders">Mis Pedidos</a>
      </div>
      <div className="user-profile-details">
        <h1>Detalles de la Cuenta:</h1>
        <p><strong>Nombre:</strong> {user.name}</p>
        <p><strong>Correo Electrónico:</strong> {user.email}</p>
        <p><strong>Dirección:</strong> {user.address}</p>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;











