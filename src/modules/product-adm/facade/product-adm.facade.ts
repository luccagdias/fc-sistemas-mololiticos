import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import ProductAdmFacadeInterface, { AddProductFacadeInputDTO, CheckStockFacadeInputDTO, CheckStockFacadeOutputDTO } from "./product-adm.facade.interface";

export interface UseCaseProps {
    addUseCase: UseCaseInterface;
    stockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
    private _addUseCase: UseCaseInterface;
    private _stockUseCase: UseCaseInterface;

    constructor(useCases: UseCaseProps) {
        this._addUseCase = useCases.addUseCase;
        this._stockUseCase = useCases.stockUseCase;
    }

    addProduct(input: AddProductFacadeInputDTO): Promise<void> {
        return this._addUseCase.execute(input);
    }

    checkStock(input: CheckStockFacadeInputDTO): Promise<CheckStockFacadeOutputDTO> {
        return this._stockUseCase.execute(input);
    }
}