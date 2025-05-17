import { Sequelize } from "sequelize-typescript";
import CheckoutRepository from "../repository/place-order.repository";
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";
import CheckoutFacade from "./checkout.facade";
import ClientModel from "../repository/client.model";
import OrderModel from "../repository/order.model";
import OrderProductModel from "../repository/product.model";

describe("CheckoutFacade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([OrderModel, ClientModel, OrderProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        // TODO: analyze why the connection is closing before database operations are completed
        // await sequelize.close();
    });

    it("should place an order", async () => {
        const mockClientFacade = {
            find: jest.fn().mockResolvedValue({
                id: "1c",
                name: "Client 0",
                document: "0000",
                email: "client@user.com",
                address: {
                    street: "some address",
                    number: "1",
                    complement: "",
                    city: "some city",
                    state: "some state",
                    zipCode: "000",
                },
            }),
        };

        const mockProductFacade = {
            checkStock: jest.fn().mockResolvedValue({
                productId: "1",
                stock: 10,
            }),
        };

        const mockCatalogFacade = {
            find: jest.fn().mockResolvedValue({
                id: "1",
                name: "Product 1",
                description: "Product 1 Description",
                salesPrice: 100,
            }),
        };

        const mockInvoiceFacade = {
            generate: jest.fn().mockResolvedValue({
                id: "1",
                name: "Invoice 1",
                document: "123456789-00",
                street: "Street 1",
                number: "1",
                complement: "Complement 1",
                city: "City 1 ",
                state: "State 1",
                zipCode: "00000-000",
                items: [
                    {
                        id: "1",
                        name: "Product 1",
                        price: 100,
                    }
                ],
                total: 100,
            })
        }

        const mockPaymentFacade = {
            process: jest.fn().mockResolvedValue({
                transactionID: "1",
                orderID: "1",
                amount: 1,
                status: "approved",
                createdAt: new Date(),
                updatedAt: new Date(),
            })
        }

        const repository = new CheckoutRepository();
        const placeOrderUseCase = new PlaceOrderUseCase(
            mockClientFacade as any,
            mockProductFacade as any,
            mockCatalogFacade as any,
            repository,
            mockInvoiceFacade as any,
            mockPaymentFacade as any,
        );
        const facade = new CheckoutFacade({placeOrderUseCase});
        
        const output = await facade.placeOrder({
            clientId: "1",
            products: [{ productId: "1"}],
        });

        expect(output.id).toBeDefined();
        expect(output.invoiceId).toBeDefined();
        expect(output.products).toBeDefined();
        expect(output.status).toBeDefined();
        expect(output.total).toBeDefined();
    });
})