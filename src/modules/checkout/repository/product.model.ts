import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import OrderModel from "./order.model";

@Table({
  tableName: "order_products",
  timestamps: false,
})
export default class OrderProductModel extends Model {
  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  order_id: string;

  @Column({ allowNull: false })
  product_id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  description: string;

  @Column({ allowNull: false })
  sales_price: number;

  @BelongsTo(() => OrderModel)
  order: OrderModel;
}