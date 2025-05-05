import ID from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import CheckStockUseCase from "./check-stock.usecase";

const product = new Product({
    id: new ID("1"),
    name: "Product 1",
    description: "Product description",
    purchasePrice: 100,
    stock: 10,
});

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
    };
};

describe("CheckStockUseCase test", () => {
    it("should get stock of a product", async () => {
        const productRepository = MockRepository();
        const usecase = new CheckStockUseCase(productRepository);

        const input = {
            productId: "1",
        };
        const result = await usecase.execute(input);

        expect(result.productId).toEqual("1");
        expect(result.stock).toEqual(10);
    });
})