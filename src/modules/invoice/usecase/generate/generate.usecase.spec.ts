import ID from "../../../@shared/domain/value-object/id.value-object"
import Invoice from "../../domain/invoice.entity"
import GenerateInvoiceUseCase from "./generate.usecase";

const invoice = new Invoice({
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
        {
            id: new ID("2"),
            name: "Item 2",
            price: 200,
        },
    ],
});

const MockRepository = () => {
    return {
        generate: jest.fn().mockReturnValue(Promise.resolve()),
        find: jest.fn(),
    };
};

describe("GenerateInvoiceUseCase Unit Test", () => {
    it("should generate an invoice", async () => {
        const invoiceRepository = MockRepository();
        const usecase = new GenerateInvoiceUseCase(invoiceRepository);

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
        }

        const result = await usecase.execute(input)

        expect(invoiceRepository.generate).toHaveBeenCalled()
        expect(result.id).toBeDefined()
        expect(result.name).toBe(input.name)
        expect(result.document).toBe(input.document)
        expect(result.street).toBe(input.street)
        expect(result.number).toBe(input.number)
        expect(result.complement).toBe(input.complement)
        expect(result.city).toBe(input.city)
        expect(result.state).toBe(input.state)
        expect(result.zipCode).toBe(input.zipCode)
        expect(result.items[0].id).toBe(input.items[0].id)
        expect(result.items[0].name).toBe(input.items[0].name)
        expect(result.items[0].price).toBe(input.items[0].price)
        expect(result.items[1].id).toBe(input.items[1].id)
        expect(result.items[1].name).toBe(input.items[1].name)
        expect(result.items[1].price).toBe(input.items[1].price)
        expect(result.total).toBe(300)
    });
});