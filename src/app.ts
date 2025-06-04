import express from 'express';
import productRoutes from './modules/product-adm/api/routes';
import clientRoutes from './modules/client-adm/api/routes';
import checkoutRoutes from './modules/checkout/api/routes';

const app = express();

app.use(express.json());
app.use('/api', productRoutes);
app.use('/api', clientRoutes);
app.use('/api', checkoutRoutes);

export default app; 