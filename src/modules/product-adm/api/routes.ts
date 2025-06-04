import { Router } from 'express';
import ProductAdmFacadeFactory from '../factory/facade.factory';

const router = Router();

router.post('/products', async (req, res) => {
    const productFacade = ProductAdmFacadeFactory.create();
    try {
        await productFacade.addProduct(req.body);
        res.status(201).send();
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router; 