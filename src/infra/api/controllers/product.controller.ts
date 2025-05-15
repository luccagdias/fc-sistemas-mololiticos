import { Request, Response } from 'express';
import StoreCatalogFacadeFactory from '../../../modules/store-catalog/factory/facade.factory';

export class ProductController {
    async find(req: Request, res: Response) {
        try {
            const facade = StoreCatalogFacadeFactory.create();
            const output = await facade.find({ id: req.params.id });
            res.status(200).json(output);
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const facade = StoreCatalogFacadeFactory.create();
            const output = await facade.findAll();
            res.status(200).json(output);
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}