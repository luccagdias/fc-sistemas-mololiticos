export interface PaymentFacadeInputDto {
    orderID: string;
    amount: number;
}

export interface PaymentFacadeOutputDto {
    transactionID: string;
    orderID: string;
    amount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export default interface PaymentFacadeInterface {
    process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto>;
}