import { Model } from "sequelize-typescript";
import InvoiceGateway from "../gateway/invoice.gateway";
import Invoice from "../domain/invoice.entity";
import { InvoiceModel, AddressModel, InvoiceItemModel } from "./invoice.model";
import ID from "../../@shared/domain/value-object/id.value-object";

export default class InvoiceRepository implements InvoiceGateway {
    async generate(input: Invoice): Promise<void> {
        await InvoiceModel.create(
            {
                id: input.id.id,
                name: input.name,
                document: input.document,
                total: input.total,
                createdAt: input.createdAt,
                updatedAt: input.updatedAt,
                address: {
                    id: input.id.id,
                    street: input.address.street,
                    number: input.address.number,
                    complement: input.address.complement,
                    city: input.address.city,
                    state: input.address.state,
                    zipCode: input.address.zipCode,
                },
                items: input.items.map((item) => ({
                    id: item.id.id,
                    name: item.name,
                    price: item.price,
                })),
            },
            {
                include: [
                    { model: AddressModel },
                    { model: InvoiceItemModel },
                ],
            }
        );
    }
    
    async find(id: string): Promise<Invoice> {
        const invoice = await InvoiceModel.findOne({
            where: { id },
            include: [
                { model: AddressModel },
                { model: InvoiceItemModel }
            ]
        });

        if (!invoice) {
            throw new Error(`Invoice with id ${id} not found`);
        }

        return new Invoice({
            id: new ID(invoice.id),
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
            },
            items: invoice.items.map(item => ({
                id: new ID(item.id),
                name: item.name,
                price: item.price,
            })),
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
        });
    }
}

