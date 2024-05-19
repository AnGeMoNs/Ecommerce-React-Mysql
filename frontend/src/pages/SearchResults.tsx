// src/pages/SearchResults.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../assets/css/products.css';
import '../assets/css/navbar.css';
import '../assets/css/footer.css';

interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string; // Añade imageUrl al tipo Product
}

const SearchResults: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('q');
        if (query) {
            fetchProducts(query);
        }
    }, [location]);

    const fetchProducts = async (query: string) => {
        try {
            const response = await axios.get(`http://localhost:5000/products/search?q=${query}`, { withCredentials: true });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <h1>Resultados de Búsqueda</h1>
            <ul className="product-list">
                {products.length > 0 ? (
                    products.map((product) => (
                        <li key={product.id} className="product-item">
                            <Link to={`/products/${product.id}`}>
                                <img src={product.imageUrl} alt={product.name} className="product-image" />
                                <div>
                                    <h2>{product.name}</h2>
                                    <p>${product.price}</p>
                                </div>
                            </Link>
                        </li>
                    ))
                ) : (
                    <li>No se encontraron productos.</li>
                )}
            </ul>
            <Footer />
        </div>
    );
};

export default SearchResults;

