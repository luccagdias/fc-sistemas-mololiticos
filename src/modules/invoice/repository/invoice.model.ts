import { Model, Column, Table, PrimaryKey, HasMany, HasOne, ForeignKey, BelongsTo } from "sequelize-typescript";

@Table({
  tableName: "invoices",
  timestamps: true,
})
export class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  document: string;

  @HasOne(() => AddressModel)
  address: Awaited<AddressModel>;

  @HasMany(() => InvoiceItemModel)
  items: Awaited<InvoiceItemModel[]>;

  @Column({ allowNull: false })
  total: number;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;
}

@Table({
  tableName: "addresses",
  timestamps: false,
})
export class AddressModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  street: string;

  @Column({ allowNull: false })
  number: string;

  @Column({ allowNull: false })
  complement: string;

  @Column({ allowNull: false })
  city: string;

  @Column({ allowNull: false })
  state: string;

  @Column({ allowNull: false })
  zipCode: string;

  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: false })
  invoiceId: string;

  @BelongsTo(() => InvoiceModel)
  invoice: Awaited<InvoiceModel>;
}

@Table({
  tableName: "invoice_items",
  timestamps: false,
})
export class InvoiceItemModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  price: number;

  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: false })
  invoiceId: string;

  @BelongsTo(() => InvoiceModel)
  invoice: Awaited<InvoiceModel>;
}