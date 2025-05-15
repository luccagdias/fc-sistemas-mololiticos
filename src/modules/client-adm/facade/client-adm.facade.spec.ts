import { addScopeOptionsGetter, Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import FindClientUseCase from "../usecase/find-client/add-client.usecase";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";
import Address from "../../@shared/domain/value-object/address";

describe("ClientFacade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a client", async () => {
        const facade = ClientAdmFacadeFactory.create()

        const input = {
            id: "1",
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
        };

        await facade.add(input);

        const client = await ClientModel.findOne({ where: { id: "1" } });

        expect(client).toBeDefined();
        expect(client.name).toBe(input.name);
        expect(client.email).toBe(input.email);
        expect(client.document).toBe(input.document);
        expect(client.street).toBe(input.address.street);
    });

    it("should find a client", async () => {
        const facade = ClientAdmFacadeFactory.create()

        const input = {
            id: "1",
            name: "Client 1",
            email: "x@x.com",
            document: "1234-5678",
            address: new Address(
                "Rua 123",
                "99",
                "Casa Verde",
                "Criciúma",
                "SC",
                "88888-888"
            )
        };

        await facade.add(input)
        
        const client = await facade.find({ id: "1" })

        expect(client).toBeDefined();
        expect(client.id).toBe(input.id)
        expect(client.name).toBe(input.name)
        expect(client.email).toBe(input.email)
        expect(client.document).toBe(input.document)
        expect(client.address.street).toBe(input.address.street)
        expect(client.address.number).toBe(input.address.number)
        expect(client.address.complement).toBe(input.address.complement)
        expect(client.address.city).toBe(input.address.city)
        expect(client.address.state).toBe(input.address.state)
        expect(client.address.zipCode).toBe(input.address.zipCode)
    });
});