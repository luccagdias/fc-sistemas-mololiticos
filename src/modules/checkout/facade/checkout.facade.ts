import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import CheckoutFacadeInterface, { PlaceOrderFacadeInputDto, PlaceOrderFacadeOutputDto } from "./checkout.facade.interface";

export interface UseCaseProps {
    placeOrderUseCase: UseCaseInterface;
}

export default class CheckoutFacade implements CheckoutFacadeInterface {
    private _placeOrderUseCase: UseCaseInterface;

    constructor(useCaseProps: UseCaseProps) {
        this._placeOrderUseCase = useCaseProps.placeOrderUseCase;
    }

    placeOrder(input: PlaceOrderFacadeInputDto): Promise<PlaceOrderFacadeOutputDto> {
        return this._placeOrderUseCase.execute(input)        
    }
}