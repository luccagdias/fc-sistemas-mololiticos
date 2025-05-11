import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import ID from "../../@shared/domain/value-object/id.value-object"

type TransactionProps = {
    id?: ID;
    amount: number;
    orderID: string;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export default class Transaction extends BaseEntity implements AggregateRoot {
    private _amount: number;
    private _orderID: string;
    private _status: string;

    constructor(props: TransactionProps) {
        super(props.id);
        this._amount = props.amount;
        this._orderID = props.orderID;
        this._status = props.status || "pending";
    }

    validate(): void {
        if (this._amount <= 0) {
            throw new Error("Transaction amount must be greater than zero");
        }
    }

    approve(): void {
        this._status = "approved";
    }

    decline(): void {
        this._status = "declined";
    }

    process(): void {
        if (this._amount >= 100) {
            this.approve();
        } else {
            this.decline();
        }
    }

    get amount(): number {
        return this._amount;
    }

    get orderID(): string {
        return this._orderID;
    }

    get status(): string {
        return this._status;
    }
}
