const Cart = require('../models/cart');
const CartItem = require('../models/cartItem');
const Product = require('../models/product');

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!quantity || isNaN(quantity)) {
            return res.status(400).json({ success: false, message: 'Cantidad no válida' });
        }

        let cartId = req.session.cartId;

        if (!cartId) {
            const cart = await Cart.create({ userId: req.user.id });
            cartId = cart.id;
            req.session.cartId = cartId;
        }

        await CartItem.create({ cartId, productId, quantity });

        // Obtener el carrito actualizado
        const cartItems = await CartItem.findAll({
            where: { cartId },
            include: [{ model: Product }]
        });

        res.json({ success: true, cart: { items: cartItems } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al añadir al carrito' });
    }
};

exports.viewCart = async (req, res) => {
    try {
        const cartId = req.session.cartId;
        let items = [];
        let total = 0;

        if (cartId) {
            items = await CartItem.findAll({
                where: { cartId },
                include: [{ model: Product }]
            });

            // Calcular el total del carrito
            total = items.reduce((acc, item) => acc + (item.Product.price * item.quantity), 0);
        }

        res.json({ items, total });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el carrito' });
    }
};

exports.incrementItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await CartItem.findByPk(itemId);
        if (item) {
            item.quantity += 1;
            await item.save();
        }
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al incrementar la cantidad del producto' });
    }
};

exports.decrementItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await CartItem.findByPk(itemId);
        if (item) {
            if (item.quantity > 1) {
                item.quantity -= 1;
                await item.save();
            } else {
                await item.destroy();
            }
        }
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al decrementar la cantidad del producto' });
    }
};
