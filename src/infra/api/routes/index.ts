import express from 'express';
import { ProductController } from '../controllers/product.controller';
import { ClientController } from '../controllers/client.controller';
import { OrderController } from '../controllers/order.controller';

const router = express.Router();
const productController = new ProductController();
const clientController = new ClientController();
const orderController = new OrderController();

// Product routes
router.get('/products', productController.findAll);
router.get('/products/:id', productController.find);

// Client routes
router.post('/clients', clientController.add);
router.get('/clients/:id', clientController.find);

// Order routes
router.post('/orders', orderController.placeOrder);

export default router;