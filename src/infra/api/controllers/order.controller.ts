import { Request, Response } from 'express';
import CheckoutFacadeFactory from '../../../modules/checkout/factory/checkout.facade.factory';

export class OrderController {
    async placeOrder(req: Request, res: Response) {
        try {
            const facade = CheckoutFacadeFactory.create();
            const output = await facade.placeOrder({
                clientId: req.body.clientId,
                products: req.body.products
            });
            res.status(201).json(output);
        } catch (err) {
            if (err.message === "Client not found" || err.message === "Product not found") {
                res.status(404).json({ message: err.message });
            } else if (err.message.includes("not available in stock")) {
                res.status(400).json({ message: err.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }
}