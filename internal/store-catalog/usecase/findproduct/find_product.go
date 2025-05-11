package findproduct

import (
	repository "github.com/fc-sistemas-monoliticos/internal/store-catalog/repository/port"
	"github.com/fc-sistemas-monoliticos/internal/store-catalog/usecase/port"
)

type FindProductUseCase struct {
	repository repository.Repository
}

func NewFindProductUseCase(repository repository.Repository) port.FindProductUseCase {
	return FindProductUseCase{repository: repository}
}

func (f FindProductUseCase) Execute(input port.FindProductInputDTO) (port.FindProductOutputDTO, error) {
	product, err := f.repository.FindByID(input.ID)
	if err != nil {
		return port.FindProductOutputDTO{}, err
	}

	return port.FindProductOutputDTO{
		ID:          product.ID,
		Name:        product.Name,
		Description: product.Description,
		SalesPrice:  product.SalesPrice,
	}, nil
}
