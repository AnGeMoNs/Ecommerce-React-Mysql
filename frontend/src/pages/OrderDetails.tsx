// src/pages/OrderDetails.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../assets/css/orders.css';
import '../assets/css/navbar.css';
import '../assets/css/footer.css';

interface OrderItem {
  Product: {
    name: string;
  };
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  status: string;
  totalPrice: number;
  shippingAddress: string;
  paymentDetails: string;
  OrderItems: OrderItem[];
}

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/orders/${id}`, { withCredentials: true });
        setOrder(response.data.order); // Accede a 'order' dentro de 'response.data'
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (!order) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <Navbar />
      <h1 className="orders-title">Detalles del Pedido</h1>
      <div className="order-details">
        <p>Pedido #: {order.id}</p>
        <p>Estado: {order.status}</p>
        <p>Total: ${order.totalPrice}</p>
        <p>Dirección de Envío: {order.shippingAddress}</p>
        <p>Detalles del Pago: {order.paymentDetails}</p>
        <h2 className="order-items-title">Productos</h2>
        <ul className="order-items-list">
          {order.OrderItems && order.OrderItems.length > 0 ? (
            order.OrderItems.map((item, index) => (
              <li key={index} className="order-items-list-item">
                <p>Producto: {item.Product.name}</p>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio: ${item.price}</p>
              </li>
            ))
          ) : (
            <li>No hay productos en este pedido.</li>
          )}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetails;


