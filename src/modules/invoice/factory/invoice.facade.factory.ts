import InvoiceFacade from "../facade/invoice.facade"; import InvoiceFacadeInterface from "../facade/invoice.facade.interface"; import InvoiceRepository from "../repository/invoice.repository"; import FindInvoiceUseCase from "../usecase/find/find.usecase"; import GenerateInvoiceUseCase from "../usecase/generate/generate.usecase";

export default class InvoiceFacadeFactory {
    static create(): InvoiceFacadeInterface {
        const repository = new InvoiceRepository();
        const generateUsecase = new GenerateInvoiceUseCase(repository);
        const findUsecase = new FindInvoiceUseCase(repository);
        return new InvoiceFacade({
            generateInvoiceUseCase: generateUsecase,
            findInvoiceUseCase: findUsecase,
        });
    }
}