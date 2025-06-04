import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../modules/product-adm/repository/product.model";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import OrderModel from "../../modules/checkout/repository/order.model";
import OrderProductModel from "../../modules/checkout/repository/product.model";

export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
});

sequelize.addModels([ProductModel, ClientModel, OrderModel, OrderProductModel]);

export default sequelize; 