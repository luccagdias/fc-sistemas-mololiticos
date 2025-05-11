import Transaction from "../../domain/transaction.entity";
import PaymentGateway from "../../gateway/payment-gateway";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.dto";

export default class ProcessPaymentUseCase {
    constructor(private paymentRepository: PaymentGateway) {}

    async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
        const transaction = new Transaction({
            amount: input.amount,
            orderID: input.orderID,
        });

        transaction.process();

        const persistTransaction = await this.paymentRepository.save(transaction);

        return {
            transactionID: persistTransaction.id.id,
            orderID: persistTransaction.orderID,
            amount: persistTransaction.amount,
            status: persistTransaction.status,
            createdAt: persistTransaction.createdAt,
            updatedAt: persistTransaction.updatedAt,
        };
    }
}
