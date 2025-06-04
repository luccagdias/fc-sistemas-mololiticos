import request from 'supertest';
import app from '../../../app';
import { migrator } from '../../../test-migrations/config-migrations/migrator';
import { Umzug } from "umzug";
import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from '../../product-adm/repository/product.model';
import { ClientModel } from '../../client-adm/repository/client.model';
import  CatalogProductModel from '../../store-catalog/repository/product.model'
import OrderModel from '../repository/order.model';
import OrderProductModel from '../repository/product.model';
import sequelize from '../../../infra/database/sequelize';

describe('Checkout API', () => {
    let sequelize: Sequelize;

    let migration: Umzug<any>;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
        });
        
        sequelize.addModels([ProductModel, ClientModel, OrderModel, OrderProductModel, CatalogProductModel]);

        migration = migrator(sequelize)
        await migration.up()
    });

    afterAll(async () => {
        await migration.down()
        await sequelize.close();
    });

    describe('POST /api/checkout', () => {
        it('should place an order', async () => {
            const clientData = {
                id: "1",
                name: "John Doe",
                email: "john@example.com",
                document: "12345678900",
                address: {
                    street: "Main Street",
                    number: "123",
                    complement: "Apt 4B",
                    city: "New York",
                    state: "NY",
                    zipCode: "10001"
                },
            };

            const clientResponse = await request(app)
                .post('/api/clients')
                .send(clientData);

            expect(clientResponse.status).toBe(201);

            const productData = {
                id: "1",
                name: "Product 1",
                description: "This is a test product",
                purchasePrice: 100.50,
                stock: 10
            };

            const productResponse = await request(app)
                .post('/api/products')
                .send(productData);

            expect(productResponse.status).toBe(201);


            const orderData = {
                clientId: "1",
                products: [
                    { productId: "1" }
                ]
            };

            // const orderResponse = await request(app)
            //     .post('/api/checkout')
            //     .send(orderData);

            // expect(orderResponse.status).toBe(201);
            // expect(orderResponse.body).toHaveProperty('id');
            // expect(orderResponse.body).toHaveProperty('invoiceId');
            // expect(orderResponse.body).toHaveProperty('status');
            // expect(orderResponse.body).toHaveProperty('total');
            // expect(orderResponse.body).toHaveProperty('products');
            // expect(orderResponse.body.products).toHaveLength(1);
        });
    });
}); 