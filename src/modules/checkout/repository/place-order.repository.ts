import Order from "../domain/order.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import Client from "../domain/client.entity";
import ID from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ClientModel from "./client.model";
import OrderModel from "./order.model";
import OrderProductModel from "./product.model";

export default class CheckoutRepository implements CheckoutGateway {
  async addOrder(order: Order): Promise<void> {
    await ClientModel.create({
      id: order.client.id.id,
      name: order.client.name,
      email: order.client.email,
      address: order.client.address,
    }, {
      ignoreDuplicates: true
    });

    await OrderModel.create(
      {
        id: order.id.id,
        client_id: order.client.id.id,
        status: order.status,
        total: order.total,
        products: order.products.map((product) => ({
          order_id: order.id.id,
          product_id: product.id.id,
          name: product.name,
          description: product.description,
          sales_price: product.salesPrice,
        })),
      },
      {
        include: [{ model: OrderProductModel }],
      }
    );
  }

  async findOrder(id: string): Promise<Order | null> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: [
        { model: ClientModel },
        { model: OrderProductModel },
      ],
    });

    if (!orderModel) {
      return null;
    }

    const client = new Client({
      id: new ID(orderModel.client.id),
      name: orderModel.client.name,
      email: orderModel.client.email,
      address: orderModel.client.address,
    });

    const products = orderModel.products.map((product) =>
        new Product({
          id: new ID(product.product_id),
          name: product.name,
          description: product.description,
          salesPrice: product.sales_price,
        })
    );

    return new Order({
      id: new ID(orderModel.id),
      client: client,
      products: products,
      status: orderModel.status,
    });
  }
}