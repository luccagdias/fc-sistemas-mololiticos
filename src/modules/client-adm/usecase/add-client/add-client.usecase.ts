import Address from "../../../@shared/domain/value-object/address";
import ID from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.usecase.dto";

export default class AddClientUseCase {
    constructor(private clientRepository: ClientGateway) {}

    async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
        const client = new Client({
            id: new ID(input.id) || new ID(),
            name: input.name,
            email: input.email,
            document: input.document,
            address: new Address(
                input.address.street,
                input.address.number,
                input.address.complement,
                input.address.city,
                input.address.state,
                input.address.zipCode,
            )
        });

        await this.clientRepository.add(client);
        
        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            document: client.document,
            address: new Address(
                client.address.street,
                client.address.number,
                client.address.complement,
                client.address.city,
                client.address.state,
                client.address.zipCode,
            ),
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        };
    }
}