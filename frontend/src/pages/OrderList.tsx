// src/pages/OrderList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../assets/css/orders.css';
import '../assets/css/navbar.css';
import '../assets/css/footer.css';
import { Link } from 'react-router-dom';

interface Order {
  id: number;
  status: string;
  totalPrice: number;
  createdAt: string;
}

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/orders', { withCredentials: true });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="orders-title">Mis Pedidos</h1>
      <ul className="orders-list">
        {orders.length > 0 ? (
          orders.map((order) => (
            <li key={order.id} className="orders-list-item">
              <p>Pedido #: {order.id}</p>
              <p>Estado: {order.status}</p>
              <p>Total: ${order.totalPrice}</p>
              <p>Fecha: {new Date(order.createdAt).toDateString()}</p>
              <Link to={`/orders/${order.id}`} className="orders-details-link">Ver Detalles</Link>
            </li>
          ))
        ) : (
          <li className="no-orders-message">No tienes pedidos aún.</li>
        )}
      </ul>
      <Footer />
    </div>
  );
};

export default OrderList;




