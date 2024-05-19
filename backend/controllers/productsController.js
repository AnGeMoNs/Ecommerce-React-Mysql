// controllers/productsController.js
const Product = require('../models/product');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.listProducts = async (req, res) => {
    const sort = req.query.sort || 'default';
    let order;

    if (sort === 'asc') {
        order = [['price', 'ASC']];
    } else if (sort === 'desc') {
        order = [['price', 'DESC']];
    } else {
        order = [['createdAt', 'DESC']];
    }

    try {
        const products = await Product.findAll({
            order: order
        });
        res.json(products); // Enviar respuesta JSON
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

exports.getProductDetails = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            res.status(404).json({ error: 'Producto no ' });
        } else {
            res.json(product); // Enviar respuesta JSON
        }
    } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

exports.searchProducts = async (req, res) => {
    const { q } = req.query;
    try {
        const products = await Product.findAll({
            where: {
                name: {
                    [Op.like]: `%${q}%`
                }
            },
            attributes: ['id', 'name', 'price', 'imageUrl'] // Incluye imageUrl en la respuesta
        });
        res.json(products);
    } catch (error) {
        console.error('Error al buscar productos:', error);
        res.status(500).json({ error: 'Error al buscar productos' });
    }
};

exports.featureProducts = async (req, res) => {
    try {
        const featuredProducts = await Product.findAll({
            where: {
                isFeatured: true,
            }
        });
        console.log(featuredProducts)
        res.json(featuredProducts); // Enviar respuesta JSON
    } catch (error) {
        console.error('Error al obtener los productos destacados:', error);
        res.status(500).json({ error: 'Error al obtener los productos destacados' });
    }
};


