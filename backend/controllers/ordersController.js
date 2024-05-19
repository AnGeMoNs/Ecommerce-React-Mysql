const { Order, OrderItem, CartItem, Product } = require('../models/index');
const sequelize = require('../config/database');

// Utilidad para calcular el precio total
const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + (item.Product.price * item.quantity), 0);
};

exports.placeOrder = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const cartId = req.session.cartId;
        console.log(`Cart ID: ${cartId}`);

        const cartItems = await CartItem.findAll({
            where: { cartId },
            include: [{ model: Product }],
            transaction
        });

        if (!cartItems.length) {
            console.log('El carrito está vacío.');
            return res.status(400).json({ message: 'El carrito está vacío.' });
        }

        console.log('Carrito de compras:', cartItems);

        const totalPrice = calculateTotalPrice(cartItems); // Calcula el total del precio
        console.log(`Precio total: ${totalPrice}`);

        const orderData = {
            userId: req.user.id,
            status: 'Pendiente',
            totalPrice: totalPrice,
            shippingAddress: req.body.shippingAddress,
            paymentDetails: req.body.paymentDetails
        };

        console.log('Datos del pedido:', orderData);

        const order = await Order.create(orderData, { transaction });
        console.log(`Pedido creado con ID: ${order.id} para el usuario: ${req.user.id}`);

        for (const item of cartItems) {
            const orderItemData = {
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.Product.price
            };

            console.log('Datos del OrderItem:', orderItemData);

            const orderItem = await OrderItem.create(orderItemData, { transaction });
            console.log(`OrderItem creado:`, orderItem);

            // Actualizar el stock del producto
            const product = await Product.findByPk(item.productId, { transaction });
            product.stock -= item.quantity;
            if (product.stock < 0) {
                throw new Error(`Stock insuficiente para el producto: ${product.name}`);
            }
            await product.save({ transaction });
        }

        await CartItem.destroy({ where: { cartId }, transaction });
        req.session.cartId = null;

        await transaction.commit();
        console.log('Transacción completada exitosamente');
        res.json({ message: 'Pedido realizado exitosamente', orderId: order.id });
    } catch (error) {
        await transaction.rollback();
        console.error('Error al realizar el pedido:', error);
        res.status(500).json({ message: 'Error al realizar el pedido' });
    }
};

exports.viewOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.user.id },
            include: [{
                model: OrderItem,
                include: [Product]
            }]
        });

        console.log(`Pedidos encontrados para el usuario ${req.user.id}:`, orders);
        res.status(200).json(orders); // Asegúrate de enviar los datos como JSON
    } catch (error) {
        console.error('Error al obtener los pedidos', error);
        res.status(500).json({ message: 'Error al obtener los pedidos' });
    }
};

exports.viewOrderDetails = async (req, res) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findOne({
        where: { id: orderId, userId: req.user.id },
        include: [{ model: OrderItem, include: [Product] }]
      });
  
      if (!order) {
        return res.status(404).json({ message: 'Pedido no encontrado' });
      }
  
      res.json({ order });
    } catch (error) {
      console.error('Error al obtener los detalles del pedido', error);
      res.status(500).json({ message: 'Error al obtener los detalles del pedido' });
    }
  };


