import Address from "../../../@shared/domain/value-object/address";
import ClientGateway from "../../gateway/client.gateway";
import { FindClientInputDto, FindClientOutputDto } from "./find-client.usecase.dto";

export default class FindClientUseCase {
    constructor(private clientRepository: ClientGateway) {}

    async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
        const client = await this.clientRepository.find(input.id);

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