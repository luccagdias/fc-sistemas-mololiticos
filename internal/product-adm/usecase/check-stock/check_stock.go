package check_stock

import (
	"github.com/fc-sistemas-monoliticos/internal/product-adm/repository/port"
	"github.com/fc-sistemas-monoliticos/internal/shared/usecase"
)

type CheckStockUseCase struct {
	productRepository port.Repository
}

func NewCheckStockUseCase(repository port.Repository) usecase.UseCase[CheckStockInputDTO, CheckStockOutputDTO] {
	return CheckStockUseCase{productRepository: repository}
}

func (c CheckStockUseCase) Execute(input CheckStockInputDTO) (CheckStockOutputDTO, error) {
	product, err := c.productRepository.Find(input.ID)
	if err != nil {
		return CheckStockOutputDTO{}, err
	}

	return CheckStockOutputDTO{
		ProductID: product.ID,
		Stock:     product.Stock,
	}, nil
}
