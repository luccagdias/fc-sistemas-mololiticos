import Address from "../../../@shared/domain/value-object/address";
import ID from "../../../@shared/domain/value-object/id.value-object"
import Client from "../../domain/client.entity"
import FindClientUseCase from "./add-client.usecase";

const client = new Client({
    id: new ID("1"),
    name: "Client 1",
    email: "x@x.com",
    document: "1234-5678",
    address: new Address(
        "Rua 123",
        "99",
        "Casa Verde",
        "Criciúma",
        "SC",
        "88888-888",
    )
});

const MockRepository = () => {
    return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(client),
}};

describe("FindClientUseCase Unit Test", () => {
    it("should find a client", async () => {
        const clientRepository = MockRepository();
        const usecase = new FindClientUseCase(clientRepository);
        const input = {
            id: "1",
        };

        const output = await usecase.execute(input);

        expect(clientRepository.find).toHaveBeenCalled();
        expect(output.id).toBe(input.id);
        expect(output.name).toBe(client.name);
        expect(output.email).toBe(client.email);
        expect(output.address.street).toBe(client.address.street);
        expect(output.address.number).toBe(client.address.number);
        expect(output.address.complement).toBe(client.address.complement);
        expect(output.address.city).toBe(client.address.city);
        expect(output.address.state).toBe(client.address.state);
        expect(output.address.zipCode).toBe(client.address.zipCode);
    });
});