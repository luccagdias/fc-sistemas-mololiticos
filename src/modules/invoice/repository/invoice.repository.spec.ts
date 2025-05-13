import { Sequelize } from "sequelize-typescript";
import { InvoiceModel, AddressModel, InvoiceItemModel } from "./invoice.model";
import Invoice, { Address, InvoiceItem } from "../domain/invoice.entity";
import ID from "../../@shared/domain/value-object/id.value-object";
import InvoiceRepository from "./invoice.repository";

describe("InvoiceRepository Unit Test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([InvoiceModel, AddressModel, InvoiceItemModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close()
    });

    it("should create a invoice", async () => {
        const invoice = new Invoice({
            id: new ID("1"),
            name: "Invoice 1",
            document: "Document 1", 
            address: new Address({
                street: "Street 1",
                number: "123",
                complement: "Apt 1",
                city: "City 1",
                state: "State 1",
                zipCode: "12345-678" 
            }),
            items: [
                new InvoiceItem({
                    id: new ID("1"),
                    name: "Item 1",
                    price: 100,
                })
            ]
        });

        const repository = new InvoiceRepository();
        await repository.generate(invoice)

        const invoiceDB = await InvoiceModel.findOne({
            where: { id: invoice.id.id },
            include: [
                { model: AddressModel },
                { model: InvoiceItemModel }
            ]
        });

        expect(invoiceDB.id).toBe(invoice.id.id);
        expect(invoiceDB.name).toBe(invoice.name);
        expect(invoiceDB.document).toBe(invoice.document);
        expect(invoiceDB.address.street).toBe(invoice.address.street);
        expect(invoiceDB.address.number).toBe(invoice.address.number);
        expect(invoiceDB.address.complement).toBe(invoice.address.complement);
        expect(invoiceDB.address.city).toBe(invoice.address.city);
        expect(invoiceDB.address.state).toBe(invoice.address.state);
        expect(invoiceDB.address.zipCode).toBe(invoice.address.zipCode);
        expect(invoiceDB.items[0].id).toBe(invoice.items[0].id.id);
        expect(invoiceDB.items[0].name).toBe(invoice.items[0].name);
        expect(invoiceDB.items[0].price).toBe(invoice.items[0].price);
        expect(invoiceDB.total).toBe(invoice.total);
    });

    it("should find a invoice", async () => {
        
        await InvoiceModel.create(
            {
                id: "1",
                name: "Invoice 1",
                document: "Document 1",
                total: 100,
                createdAt: new Date(),
                updatedAt: new Date(),
                address: {
                    id: "1",
                    street: "Street 1",
                    number: "123",
                    complement: "Apt 1",
                    city: "City 1",
                    state: "State 1",
                    zipCode: "12345-678",
                    invoiceId: "1"
                },
                items: [
                    {
                        id: "1",
                        name: "Item 1",
                        price: 50,
                        invoiceId: "1"
                    },
                    {
                        id: "2",
                        name: "Item 2",
                        price: 50,
                        invoiceId: "1"
                    }
                ],
            },
            {
                include: [
                    { model: AddressModel },
                    { model: InvoiceItemModel }
                ]
            }
        );

        const repository = new InvoiceRepository();
        const invoice = await repository.find("1");
        expect(invoice.id.id).toBe("1");
        expect(invoice.name).toBe("Invoice 1");
        expect(invoice.document).toBe("Document 1");
        expect(invoice.address.street).toBe("Street 1");
        expect(invoice.address.number).toBe("123");
        expect(invoice.address.complement).toBe("Apt 1");
        expect(invoice.address.city).toBe("City 1");
        expect(invoice.address.state).toBe("State 1");
        expect(invoice.address.zipCode).toBe("12345-678");
        expect(invoice.items[0].id.id).toBe("1");
        expect(invoice.items[0].name).toBe("Item 1");
        expect(invoice.items[0].price).toBe(50);
        expect(invoice.items[1].id.id).toBe("2");
        expect(invoice.items[1].name).toBe("Item 2");
        expect(invoice.items[1].price).toBe(50);
        expect(invoice.total).toBe(100);
    });
});