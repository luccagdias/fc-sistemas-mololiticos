import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import Product from "../domain/product.entity";
import ID from "../../@shared/domain/value-object/id.value-object";
import ProductRepository from "./product.repository";

describe("ProductRepository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a product", async () => {
        const productProps = {
            id: new ID("1"),
            name: "Product 1",
            description: "Product 1 description", 
            purchasePrice: 100,
            stock: 10
        };

        const product = new Product(productProps);
        const productRepository = new ProductRepository();
        await productRepository.add(product)

        const productDB = await ProductModel.findOne({
            where: {id: productProps.id.id},
        })

        expect(productDB.id).toBe(productProps.id.id);
        expect(productDB.name).toBe(productProps.name);
        expect(productDB.description).toBe(productProps.description);
        expect(productDB.purchasePrice).toBe(productProps.purchasePrice);
        expect(productDB.stock).toBe(productProps.stock);
    });

    it("should find a produc", async () => {
        const productRepository = new ProductRepository();

        ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const product = await productRepository.find("1")

        expect(product.id.id).toEqual("1");
        expect(product.name).toEqual("Product 1");
        expect(product.description).toBe("Product 1 description");
        expect(product.purchasePrice).toBe(100);
        expect(product.stock).toBe(10);
    });
})