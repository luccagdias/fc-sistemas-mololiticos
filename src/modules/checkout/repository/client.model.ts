import { Table, PrimaryKey, Column, Model } from "sequelize-typescript";

@Table({
  tableName: "order_clients",
  timestamps: false,
})
export default class ClientModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: false })
  address: string;
}