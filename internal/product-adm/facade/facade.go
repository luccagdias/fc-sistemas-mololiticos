package facade

import (
	"github.com/fc-sistemas-monoliticos/internal/product-adm/facade/port"
	addproduct "github.com/fc-sistemas-monoliticos/internal/product-adm/usecase/add-product"
	checkstock "github.com/fc-sistemas-monoliticos/internal/product-adm/usecase/check-stock"
	"github.com/fc-sistemas-monoliticos/internal/shared/usecase"
)

type ProductAdmFacade struct {
	addProductUseCase usecase.UseCase[addproduct.AddProductInputDTO, addproduct.AddProductOutputDTO]
	checkStockUseCase usecase.UseCase[checkstock.CheckStockInputDTO, checkstock.CheckStockOutputDTO]
}

func NewProductAdmFacade(
	addProductUseCase usecase.UseCase[addproduct.AddProductInputDTO, addproduct.AddProductOutputDTO],
	checkStockUseCase usecase.UseCase[checkstock.CheckStockInputDTO, checkstock.CheckStockOutputDTO]) ProductAdmFacade {

	return ProductAdmFacade{
		addProductUseCase: addProductUseCase,
		checkStockUseCase: checkStockUseCase,
	}
}

func (p *ProductAdmFacade) AddProduct(input port.AddProductFacadeInputDTO) (port.AddProductFacadeOutputDTO, error) {
	product, err := p.addProductUseCase.Execute(input.ToUseCaseInput())
	if err != nil {
		return port.AddProductFacadeOutputDTO{}, err
	}

	var output port.AddProductFacadeOutputDTO
	output.FromUseCaseOutput(product)
	return output, nil
}

func (p *ProductAdmFacade) CheckStock(input port.CheckStockFacadeInputDTO) (port.CheckStockFacadeOutputDTO, error) {
	stock, err := p.checkStockUseCase.Execute(input.ToUseCaseInput())
	if err != nil {
		return port.CheckStockFacadeOutputDTO{}, err
	}

	var output port.CheckStockFacadeOutputDTO
	output.FromUseCaseOutput(stock)
	return output, nil
}
