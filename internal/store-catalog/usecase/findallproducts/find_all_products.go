package findallproducts

import (
	repository "github.com/fc-sistemas-monoliticos/internal/store-catalog/repository/port"
	"github.com/fc-sistemas-monoliticos/internal/store-catalog/usecase/port"
)

type FindAllProductsUseCase struct {
	repository repository.Repository
}

func NewFindAllProductsUseCase(repository repository.Repository) port.FindAllProductsUseCase {
	return FindAllProductsUseCase{repository: repository}
}

func (f FindAllProductsUseCase) Execute() ([]port.FindAllProductsOutputDTO, error) {
	products, err := f.repository.FindAll()
	if err != nil {
		return nil, err
	}

	var output []port.FindAllProductsOutputDTO
	for _, product := range products {
		dto := port.FindAllProductsOutputDTO{
			ID:          product.ID,
			Name:        product.Name,
			Description: product.Description,
			SalesPrice:  product.SalesPrice,
		}
		output = append(output, dto)
	}

	return output, nil
}
