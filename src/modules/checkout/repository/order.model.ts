import { Model, Column, PrimaryKey, Table, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import ClientModel from "./client.model";
import OrderProductModel from "./product.model";

@Table({
  tableName: "orders",
  timestamps: false,
})
export default class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @ForeignKey(() => ClientModel)
  @Column({ allowNull: false })
  client_id: string;

  @Column({ allowNull: false })
  status: string;

  @Column({ allowNull: false })
  total: number;

  @BelongsTo(() => ClientModel)
  client: ClientModel;

  @HasMany(() => OrderProductModel)
  products: OrderProductModel[];
}