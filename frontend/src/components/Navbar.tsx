// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import '../assets/css/navbar.css';
import cartImage from '../assets/images/cart.png';
import axios from 'axios';

const Navbar: React.FC = () => {
    const { user, setUser } = useUserContext();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/users/logout', {}, { withCredentials: true });
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate(`/products/search?q=${searchQuery}`);
    };

    return (
        <nav>
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/products">Productos</Link></li>
                <li>
                    <Link to="/cart">
                        <div className="cart-container">
                            <img className="cart" src={cartImage} alt="Carrito" />
                        </div>
                    </Link>
                </li>
                <li>
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            name="q"
                            placeholder="Buscar productos"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit">Buscar</button>
                    </form>
                </li>
                {user ? (
                    <li className={`dropdown nav-item ${isDropdownOpen ? 'show' : ''}`}>
                        <button
                            className="nav-link dropdown-toggle"
                            id="userDropdown"
                            aria-haspopup="true"
                            aria-expanded={isDropdownOpen ? 'true' : 'false'}
                            onClick={toggleDropdown}
                        >
                            Hola 👌 {user.name} <span className="fa fa-chevron-down dropdown-caret"></span>
                        </button>
                        <div
                            className={`dropdown-menu dropdown-menu-right ${isDropdownOpen ? 'show' : ''}`}
                            id="dropdownMenu"
                            aria-labelledby="userDropdown"
                            aria-hidden={isDropdownOpen ? 'false' : 'true'}
                        >
                            <Link className="dropdown-item" to="/profile">Perfil</Link>
                            <a className="dropdown-item" href="/logout" onClick={handleLogout}>Cerrar Sesión</a>
                        </div>
                    </li>
                ) : (
                    <>
                        <li><Link to="/login">Iniciar Sesión</Link></li>
                        <li><Link to="/register">Registrarse</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;




