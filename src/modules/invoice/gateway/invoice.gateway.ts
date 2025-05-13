import Invoice from "../domain/invoice.entity";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "../usecase/generate/generate.dto";

export default interface InvoiceGateway {
  generate(input: Invoice): Promise<void>;
  find(input: string): Promise<Invoice>;
}