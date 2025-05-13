import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import InvoiceFacadeInterface, { GenerateInvoiceFacadeInputDTO, GenerateInvoiceFacadeOutputDTO, FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO } from "./invoice.facade.interface";

export interface UseCaseProps {
    generateInvoiceUseCase: UseCaseInterface;
    findInvoiceUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private _generateInvoiceUseCase: UseCaseInterface;
    private _findInvoiceUseCase: UseCaseInterface;

    constructor(useCases: UseCaseProps) {
        this._generateInvoiceUseCase = useCases.generateInvoiceUseCase;
        this._findInvoiceUseCase = useCases.findInvoiceUseCase;
    }

    generate(input: GenerateInvoiceFacadeInputDTO): Promise<GenerateInvoiceFacadeOutputDTO> {
        return this._generateInvoiceUseCase.execute(input);
    }

    find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
        return this._findInvoiceUseCase.execute(input);
    }
}
