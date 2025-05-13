import ID from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import FindInvoiceUseCase from "./find.usecase";

const invoice = new Invoice({
    id: new ID("1"),
    name: "John Doe",
    document: "123456789",
    address: {
        street: "123 Main St",
        number: "456",
        complement: "Apt 789",
        city: "New York",
        state: "NY",
        zipCode: "10001",
    },
    items: [
        {
            id: new ID("1"),
            name: "Item 1",
            price: 100,
        },
    ],
});

const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    };
};

describe("FindInvoiceUseCase Unit Test", () => {
    it("should find an invoice", async () => {
        const invoiceRepository = MockRepository();
        const usecase = new FindInvoiceUseCase(invoiceRepository);

        const input = {
            id: "1",
        };

        const result = await usecase.execute(input);

        expect(invoiceRepository.find).toHaveBeenCalled();
        expect(result.id).toBe(input.id);
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.address.number).toBe(invoice.address.number);
        expect(result.address.complement).toBe(invoice.address.complement);
        expect(result.address.city).toBe(invoice.address.city);
        expect(result.address.state).toBe(invoice.address.state);
        expect(result.address.zipCode).toBe(invoice.address.zipCode);
        expect(result.items[0].id).toBe(invoice.items[0].id.id);
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);
        expect(result.total).toBe(invoice.total);
        expect(result.createdAt).toEqual(invoice.createdAt);
    });
});