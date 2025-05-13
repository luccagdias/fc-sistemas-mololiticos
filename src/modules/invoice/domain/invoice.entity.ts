import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface"
import BaseEntity from "../../@shared/domain/entity/base.entity"
import ID from "../../@shared/domain/value-object/id.value-object"

type InvoiceProps = {
    id?: ID
    name: string
    document: string
    address: AddressProps
    items: InvoiceItemProps[]
    createdAt?: Date
    updatedAt?: Date
}

type AddressProps = {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
}

type InvoiceItemProps = {
    id: ID
    name: string
    price: number
}

export default class Invoice extends BaseEntity implements AggregateRoot {
    private _name: string
    private _document: string
    private _address: Address
    private _items: InvoiceItem[]
    private _total: number

    constructor(props: InvoiceProps) {
        super(props.id);
        this._name = props.name
        this._document = props.document
        this._address = new Address(props.address)
        this._items = props.items.map(item => new InvoiceItem(item))
        this._total = this.calculateTotal()
    }
    
    get name(): string {
        return this._name
    }

    get document(): string {
        return this._document
    }

    get address(): Address {
        return this._address
    }
    
    get items(): InvoiceItem[] {
        return this._items
    }

    get total(): number {
        return this._total
    }

    private calculateTotal(): number {
        return this._items.reduce((total, item) => total + item.price, 0);
    }
}

export class Address extends BaseEntity implements AggregateRoot {
    private _street: string;
    private _number: string;
    private _complement: string;
    private _city: string;
    private _state: string;
    private _zipCode: string;

    constructor(props: AddressProps) {
        super(new ID());
        this._street = props.street;
        this._number = props.number;
        this._complement = props.complement;
        this._city = props.city;
        this._state = props.state;
        this._zipCode = props.zipCode;
    }

    get street(): string {
        return this._street;
    }

    get number(): string {
        return this._number;
    }

    get complement(): string {
        return this._complement;
    }

    get city(): string {
        return this._city;
    }

    get state(): string {
        return this._state;
    }

    get zipCode(): string {
        return this._zipCode;
    }
}

export class InvoiceItem extends BaseEntity implements AggregateRoot {
    private _name: string
    private _price: number

    constructor(props: InvoiceItemProps) {
        super(props.id);
        this._name = props.name;
        this._price = props.price;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }
}
