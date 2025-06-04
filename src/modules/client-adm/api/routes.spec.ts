import request from 'supertest';
import app from '../../../app';
import sequelize from '../../../infra/database/sequelize';

describe('Client API', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    describe('POST /api/clients', () => {
        it('should create a client', async () => {
            const clientData = {
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
                }
            };

            const response = await request(app)
                .post('/api/clients')
                .send(clientData);

            expect(response.status).toBe(201);
        });
    });
}); 