import request from 'supertest';
import app from '../../../app';
import sequelize from '../../../infra/database/sequelize';

describe('Product API', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    describe('POST /api/products', () => {
        it('should create a product', async () => {
            const productData = {
                name: "Product 1",
                description: "This is a test product",
                purchasePrice: 100.50,
                stock: 10
            };

            const response = await request(app)
                .post('/api/products')
                .send(productData);

            expect(response.status).toBe(201);
        });

    });
}); 