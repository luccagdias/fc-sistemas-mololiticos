import { Router } from 'express';
import CheckoutFacadeFactory from '../factory/checkout.facade.factory';

const router = Router();

router.post('/checkout', async (req, res) => {
    const checkoutFacade = CheckoutFacadeFactory.create();
    try {
        const output = await checkoutFacade.placeOrder(req.body);
        res.status(201).json(output);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router; 