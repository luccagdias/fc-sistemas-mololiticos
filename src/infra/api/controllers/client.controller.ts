import { Request, Response } from 'express';
import ClientAdmFacadeFactory from '../../../modules/client-adm/factory/client-adm.facade.factory';
import Address from '../../../modules/@shared/domain/value-object/address';

export class ClientController {
    async add(req: Request, res: Response) {
        try {
            const facade = ClientAdmFacadeFactory.create();
            const output = await facade.add({
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                document: req.body.document,
                address: new Address(
                    req.body.address.street,
                    req.body.address.number,
                    req.body.address.complement,
                    req.body.address.city,
                    req.body.address.state,
                    req.body.address.zipCode
                ),
            });
            res.status(201).json(output);
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async find(req: Request, res: Response) {
        try {
            const facade = ClientAdmFacadeFactory.create();
            const output = await facade.find({ id: req.params.id });
            res.status(200).json(output);
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}