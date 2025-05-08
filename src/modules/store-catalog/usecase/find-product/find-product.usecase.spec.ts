import ID from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUseCase from "./find-product.usecase";

const product = new Product({
    id: new ID("1"),
    name: "Product 1",
    description: "Description 1",
    salesPrice: 100,
});

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(product),
        findAll: jest.fn(),
    };
};

describe("FindProductUseCase Unit Tests", () => {
    it("should find a product", async () => {
        const productRepository = MockRepository();
        const usecase = new FindProductUseCase(productRepository);

        const input = {id: "1"};
        const output = await usecase.execute(input);

        expect(productRepository.find).toHaveBeenCalled();
        expect(output.id).toBe("1");
        expect(output.name).toBe("Product 1");
        expect(output.description).toBe("Description 1");
        expect(output.salesPrice).toBe(100);
    });
})