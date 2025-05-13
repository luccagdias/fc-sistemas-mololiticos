import { Sequelize } from "sequelize-typescript";
import { AddressModel, InvoiceItemModel, InvoiceModel } from "../repository/invoice.model";
import InvoiceRepository from "../repository/invoice.repository";
import GenerateInvoiceUseCase from "../usecase/generate/generate.usecase";
import FindInvoiceUseCase from "../usecase/find/find.usecase";
import InvoiceFacade from "./invoice.facade";
import { Address } from "../domain/invoice.entity";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe("InvoiceFacade test", () => {
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
        await sequelize.close();
    });

    it("should generate an invoice", async () => {
        const facade = InvoiceFacadeFactory.create();
        
        const input = {
            name: "John Doe",
            document: "123456789",
            street: "123 Main St",
            number: "456",
            complement: "Apt 789",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            items: [
                {
                    id: "1",
                    name: "Item 1",
                    price: 100,
                },
                {
                    id: "2",
                    name: "Item 2",
                    price: 200,
                },
            ],
        };

        const result = await facade.generate(input);

        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.street).toBe(input.street);
        expect(result.number).toBe(input.number);
        expect(result.complement).toBe(input.complement);
        expect(result.city).toBe(input.city);
        expect(result.state).toBe(input.state);
        expect(result.zipCode).toBe(input.zipCode);
        expect(result.items).toEqual(input.items);
        expect(result.total).toBe(300);
    });

    it("should find an invoice", async () => {
        const facade = InvoiceFacadeFactory.create();

        const input = {
            name: "John Doe",
            document: "123456789",
            street: "123 Main St",
            number: "456",
            complement: "Apt 789",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            items: [
                {
                    id: "1",
                    name: "Item 1",
                    price: 100,
                },
                {
                    id: "2",
                    name: "Item 2",
                    price: 200,
                },
            ],
        };

        const generatedInvoice = await facade.generate(input);

        const result = await facade.find({ id: generatedInvoice.id });

        expect(result.id).toBe(generatedInvoice.id);
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.address.street).toBe(input.street);
        expect(result.address.number).toBe(input.number);
        expect(result.address.complement).toBe(input.complement);
        expect(result.address.city).toBe(input.city);
        expect(result.address.state).toBe(input.state);
        expect(result.address.zipCode).toBe(input.zipCode);
        expect(result.items).toEqual(input.items);
        expect(result.total).toBe(300);
    });
});