import { Router } from 'express';
import ClientAdmFacadeFactory from '../factory/client-adm.facade.factory';

const router = Router();

router.post('/clients', async (req, res) => {
    const clientFacade = ClientAdmFacadeFactory.create();
    try {
        await clientFacade.add(req.body);
        res.status(201).send();
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router; 