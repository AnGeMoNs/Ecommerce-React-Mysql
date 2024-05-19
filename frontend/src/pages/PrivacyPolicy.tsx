// src/pages/PrivacyPolicy.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../assets/css/main.css'; // Asegúrate de ajustar la ruta según sea necesario
import '../assets/css/navbar.css'; // Asegúrate de ajustar la ruta según sea necesario
import '../assets/css/footer.css'; // Asegúrate de ajustar la ruta según sea necesario

const PrivacyPolicy: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="content">
        <h1>Política de Privacidad</h1>
        <p>Última actualización: 16 de mayo de 2024</p>

        <h2>1. Introducción</h2>
        <p>
          En OpenSource, valoramos tu privacidad y nos comprometemos a proteger tus datos personales.
          Esta política de privacidad explica cómo recopilamos, usamos y compartimos tu información personal.
        </p>

        <h2>2. Información que Recopilamos</h2>
        <p>Podemos recopilar y procesar la siguiente información sobre ti:</p>
        <ul>
          <li>
            <strong>Información que nos proporcionas:</strong> Datos que introduces al registrarte, realizar un pedido o comunicarte con nosotros.
          </li>
          <li>
            <strong>Información sobre tus visitas y uso de nuestro sitio web:</strong> Datos como tu dirección IP, tipo de navegador, duración de la visita y páginas vistas.
          </li>
          <li>
            <strong>Información de transacciones:</strong> Detalles sobre los pedidos que realizas y pagos que efectúas.
          </li>
        </ul>

        <h2>3. Uso de tu Información</h2>
        <p>Usamos tu información para:</p>
        <ul>
          <li>Proporcionar y mejorar nuestros servicios.</li>
          <li>Gestionar tu cuenta y procesar tus pedidos.</li>
          <li>Comunicarnos contigo, incluyendo el envío de actualizaciones y promociones.</li>
          <li>Personalizar tu experiencia en nuestro sitio web.</li>
        </ul>

        <h2>4. Compartir tu Información</h2>
        <p>No compartimos tu información personal con terceros, excepto en las siguientes circunstancias:</p>
        <ul>
          <li>Cuando sea necesario para proporcionarte nuestros servicios (por ejemplo, procesadores de pago).</li>
          <li>Para cumplir con obligaciones legales.</li>
          <li>Para proteger nuestros derechos y los de nuestros usuarios.</li>
        </ul>

        <h2>5. Seguridad de tu Información</h2>
        <p>
          Tomamos medidas técnicas y organizativas razonables para proteger tu información personal contra el acceso no autorizado, la pérdida o el daño.
        </p>

        <h2>6. Tus Derechos</h2>
        <p>
          Tienes derecho a acceder, corregir y eliminar tu información personal. También puedes oponerte al procesamiento de tus datos en determinadas circunstancias.
          Para ejercer estos derechos, por favor, contacta con nosotros.
        </p>

        <h2>7. Cambios en esta Política</h2>
        <p>
          Podemos actualizar esta política de privacidad de vez en cuando. Te notificaremos sobre cualquier cambio significativo mediante la publicación de la nueva política en nuestro sitio web.
        </p>

        <h2>8. Contacto</h2>
        <p>
          Si tienes alguna pregunta o inquietud sobre nuestra política de privacidad, no dudes en contactarnos.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
