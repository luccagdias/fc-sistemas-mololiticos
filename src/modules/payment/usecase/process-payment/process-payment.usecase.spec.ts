import ID from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction.entity";
import ProcessPaymentUseCase from "./process-payment.usecase";

const approvedTransaction = new Transaction({
    id: new ID("1"),
    amount: 100,
    orderID: "1",
    status: "approved",
});

const declinedTransaction = new Transaction({
    id: new ID("2"),
    amount: 50,
    orderID: "1",
    status: "declined",
});

const MockRepositoryApproved = () => {
    return {
        save: jest.fn().mockResolvedValue(Promise.resolve(approvedTransaction)),
    };
};

const MockRepositoryDeclined = () => {
    return {
        save: jest.fn().mockResolvedValue(Promise.resolve(declinedTransaction)),
    };
};

describe("ProcessPaymentUseCase Unit Test", () => {
    it("should approve a transaction", async () => {
        const paymentRepository = MockRepositoryApproved();
        const useCase = new ProcessPaymentUseCase(paymentRepository);

        const input = {
            orderID: "1",
            amount: 100,
        };

        const result = await useCase.execute(input);

        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.transactionID).toBe(approvedTransaction.id.id);
        expect(result.orderID).toBe("1");
        expect(result.amount).toBe(100);
        expect(result.status).toBe("approved");
        expect(result.createdAt).toBe(approvedTransaction.createdAt);
        expect(result.updatedAt).toBe(approvedTransaction.updatedAt);
    });

    it("should decline a transaction", async () => {
        const paymentRepository = MockRepositoryDeclined();
        const useCase = new ProcessPaymentUseCase(paymentRepository);

        const input = {
            orderID: "1",
            amount: 50,
        };

        const result = await useCase.execute(input);

        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.transactionID).toBe(declinedTransaction.id.id);
        expect(result.orderID).toBe("1");
        expect(result.amount).toBe(50);
        expect(result.status).toBe("declined");
        expect(result.createdAt).toBe(declinedTransaction.createdAt);
        expect(result.updatedAt).toBe(declinedTransaction.updatedAt);
    });
});