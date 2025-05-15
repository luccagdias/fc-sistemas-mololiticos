import Address from "../../../@shared/domain/value-object/address";
import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
    return {
    add: jest.fn(),
    find: jest.fn(),
    }
};

describe('AddClientUseCase Unit Test', () => {
    it('should add a client', async () => {
        const clientRepository = MockRepository();
        const usecase = new AddClientUseCase(clientRepository);
        const input = {
            id: "1",
            name: "Client 1",
            email: 'x@x.com',
            document: "1234-5678",
            address: new Address(
                "Rua 123",
                "99",
                "Casa Verde",
                "Criciúma",
                "SC",
                "88888-888",
            )
        };

        const output = await usecase.execute(input);

        expect(clientRepository.add).toHaveBeenCalled();
        expect(output.id).toBeDefined();
        expect(output.name).toBe(input.name);
        expect(output.email).toBe(input.email);
        expect(output.address.street).toBe(input.address.street);
        expect(output.address.number).toBe(input.address.number);
        expect(output.address.complement).toBe(input.address.complement);
        expect(output.address.city).toBe(input.address.city);
        expect(output.address.state).toBe(input.address.state);
        expect(output.address.zipCode).toBe(input.address.zipCode);
    });
});