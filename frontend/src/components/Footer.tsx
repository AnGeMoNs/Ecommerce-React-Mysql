import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/footer.css'; // Asegúrate de ajustar la ruta según sea necesario

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-content container">
        <div className="row">
          <div className="col-md-6 text-left">
            <p>&copy; {new Date().getFullYear()} OpenSource. Todos los derechos reservados.</p>
          </div>
          <div className="col-md-6 text-right">
            <p>
              <Link to="/policy/privacy">Política de Privacidad</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
