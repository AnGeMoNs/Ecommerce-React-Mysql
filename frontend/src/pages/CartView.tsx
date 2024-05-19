import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../assets/css/cart.css'; // Asegúrate de ajustar la ruta según sea necesario
import '../assets/css/navbar.css'; // Asegúrate de ajustar la ruta según sea necesario
import '../assets/css/footer.css'; // Asegúrate de ajustar la ruta según sea necesario
import { useUserContext } from '../context/UserContext'; // Importar el contexto del usuario

interface CartItem {
  id: number;
  quantity: number;
  Product: {
    name: string;
    price: number;
  };
}

const CartView: React.FC = () => {
  const { user } = useUserContext(); // Utilizar el contexto del usuario
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [shippingAddress, setShippingAddress] = useState<string>('');
  const [paymentDetails, setPaymentDetails] = useState<string>('');

  useEffect(() => {
    if (user) { // Solo intentar obtener los ítems del carrito si el usuario está autenticado
      fetchCartItems();
    }
  }, [user]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/cart', { withCredentials: true });
      setItems(response.data.items);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleIncrement = async (itemId: number) => {
    try {
      await axios.post(`http://localhost:5000/cart/increment/${itemId}`, {}, { withCredentials: true });
      fetchCartItems();
    } catch (error) {
      console.error('Error incrementing item quantity:', error);
    }
  };

  const handleDecrement = async (itemId: number) => {
    try {
      await axios.post(`http://localhost:5000/cart/decrement/${itemId}`, {}, { withCredentials: true });
      fetchCartItems();
    } catch (error) {
      console.error('Error decrementing item quantity:', error);
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/orders/place', {
        shippingAddress,
        paymentDetails,
      }, { withCredentials: true });
      // Redirige a la página de pedidos después de realizar el pedido
      window.location.href = '/orders';
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const handlePaymentOptionClick = (value: string) => {
    setPaymentDetails(value);
  };

  return (
    <div>
      <Navbar />
      <div className="cart-view-container">
        <h1 className="cart-view-title">Carrito de Compras</h1>
        {user ? ( // Mostrar contenido del carrito solo si el usuario está autenticado
          <>
            <ul className="cart-view-items">
              {items.length > 0 ? (
                items.map((item) => (
                  <li key={item.id} className="cart-view-item">
                    <h2 className="cart-view-item-title">{item.Product.name} - {item.quantity} unidades</h2>
                    <p className="cart-view-item-subtotal">Subtotal: ${item.Product.price * item.quantity}</p>
                    <div className="cart-view-quantity-buttons">
                      <button className="cart-view-quantity-button" onClick={() => handleIncrement(item.id)}>+</button>
                      <button className="cart-view-quantity-button" onClick={() => handleDecrement(item.id)}>-</button>
                    </div>
                  </li>
                ))
              ) : (
                <li>No hay productos en tu carrito.</li>
              )}
            </ul>
            {items.length > 0 && (
              <>
                <h2 className="cart-view-total">Total: ${total.toFixed(2)}</h2>
                <form className="cart-view-order-form" onSubmit={handleSubmitOrder}>
                  <input type="hidden" name="totalPrice" value={total} />
                  <div className="cart-view-order-form-group">
                    <label className="cart-view-order-form-label" htmlFor="shippingAddress">Dirección de Envío:</label>
                    <input
                      className="cart-view-order-form-input"
                      type="text"
                      id="shippingAddress"
                      name="shippingAddress"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      required
                    />
                  </div>
                  <button className="cart-view-order-form-button" type="submit">Realizar Pedido</button>
                  <div className="cart-view-order-form-group">
                    <label className="cart-view-order-form-label" htmlFor="paymentDetails">Método de pago:</label>
                    <div className="cart-view-payment-options">
                      <img
                        src="http://localhost:5000/images/mercado.png"
                        alt="Mercado Pago"
                        className={`cart-view-payment-option ${paymentDetails === 'mercado-pago' ? 'selected' : ''}`}
                        onClick={() => handlePaymentOptionClick('mercado-pago')}
                      />
                      <img
                        src="http://localhost:5000/images/credito.png"
                        alt="Crédito"
                        className={`cart-view-payment-option ${paymentDetails === 'credito' ? 'selected' : ''}`}
                        onClick={() => handlePaymentOptionClick('credito')}
                      />
                    </div>
                    <input
                      type="hidden"
                      id="paymentDetails"
                      name="paymentDetails"
                      value={paymentDetails}
                      required
                    />
                  </div>
                </form>
              </>
            )}
          </>
        ) : (
          <p>Por favor, inicia sesión para ver tu carrito.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartView;












