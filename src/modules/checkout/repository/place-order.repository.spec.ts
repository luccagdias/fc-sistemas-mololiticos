import { Sequelize } from "sequelize-typescript";
import CheckoutRepository from "./place-order.repository";
import Client from "../domain/client.entity";
import ID from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import Order from "../domain/order.entity";
import ClientModel from "./client.model";
import OrderModel from "./order.model";
import OrderProductModel from "./product.model";

describe("Checkout Repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([OrderModel, ClientModel, OrderProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create an order", async () => {
    const client = new Client({
      id: new ID("1"),
      name: "Client 1",
      email: "client@example.com",
      address: "Street 1",
    });

    const product1 = new Product({
      id: new ID("p1"),
      name: "Product 1",
      description: "Description 1",
      salesPrice: 100,
    });

    const product2 = new Product({
      id: new ID("p2"),
      name: "Product 2",
      description: "Description 2",
      salesPrice: 200,
    });

    const order = new Order({
      id: new ID("o1"),
      client: client,
      products: [product1, product2],
      status: "pending"
    });

    const repository = new CheckoutRepository();
    await repository.addOrder(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id.id },
      include: [
        { model: ClientModel },
        { model: OrderProductModel },
      ],
    });

    expect(orderModel.id).toBe(order.id.id);
    expect(orderModel.client_id).toBe(client.id.id);
    expect(orderModel.status).toBe(order.status);
    expect(orderModel.total).toBe(order.total);
    
    expect(orderModel.client.id).toBe(client.id.id);
    expect(orderModel.client.name).toBe(client.name);
    expect(orderModel.client.email).toBe(client.email);
    expect(orderModel.client.address).toBe(client.address);

    expect(orderModel.products[0].product_id).toBe(product1.id.id);
    expect(orderModel.products[0].name).toBe(product1.name);
    expect(orderModel.products[0].description).toBe(product1.description);
    expect(orderModel.products[0].sales_price).toBe(product1.salesPrice);

    expect(orderModel.products[1].product_id).toBe(product2.id.id);
    expect(orderModel.products[1].name).toBe(product2.name);
    expect(orderModel.products[1].description).toBe(product2.description);
    expect(orderModel.products[1].sales_price).toBe(product2.salesPrice);
  });

  it("should find an order", async () => {
    // Create client model
    const clientModel = await ClientModel.create({
      id: "1",
      name: "Client 1",
      email: "client@example.com",
      address: "Street 1",
    });

    // Create order with products
    const orderModel = await OrderModel.create({
      id: "o1",
      client_id: clientModel.id,
      status: "pending",
      total: 300,
    });

    await OrderProductModel.bulkCreate([
      {
        order_id: orderModel.id,
        product_id: "p1",
        name: "Product 1",
        description: "Description 1",
        sales_price: 100,
      },
      {
        order_id: orderModel.id,
        product_id: "p2",
        name: "Product 2",
        description: "Description 2",
        sales_price: 200,
      },
    ]);

    const repository = new CheckoutRepository();
    const result = await repository.findOrder(orderModel.id);

    expect(result.id.id).toBe(orderModel.id);
    expect(result.client.id.id).toBe(clientModel.id);
    expect(result.client.name).toBe(clientModel.name);
    expect(result.client.email).toBe(clientModel.email);
    expect(result.client.address).toBe(clientModel.address);
    expect(result.status).toBe(orderModel.status);
    
    expect(result.products[0].id.id).toBe("p1");
    expect(result.products[0].name).toBe("Product 1");
    expect(result.products[0].description).toBe("Description 1");
    expect(result.products[0].salesPrice).toBe(100);

    expect(result.products[1].id.id).toBe("p2");
    expect(result.products[1].name).toBe("Product 2");
    expect(result.products[1].description).toBe("Description 2");
    expect(result.products[1].salesPrice).toBe(200);
  });

  it("should return null when order is not found", async () => {
    const repository = new CheckoutRepository();
    const result = await repository.findOrder("not-found");
    expect(result).toBeNull();
  });
});