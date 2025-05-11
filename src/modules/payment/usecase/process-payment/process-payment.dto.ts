export interface ProcessPaymentInputDto {
    orderID: string;
    amount: number;
}

export interface ProcessPaymentOutputDto {
    transactionID: string;
    orderID: string;
    amount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}