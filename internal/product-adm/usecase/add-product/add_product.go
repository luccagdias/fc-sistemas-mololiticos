package add_product

import (
	"github.com/fc-sistemas-monoliticos/internal/product-adm/repository/port"
	"github.com/fc-sistemas-monoliticos/internal/shared/usecase"
)

type AddProductUseCase struct {
	productRepository port.ProductRepository
}

func NewAddProductUseCase(repository port.ProductRepository) usecase.UseCase[AddProductInputDTO, AddProductOutputDTO] {
	return AddProductUseCase{productRepository: repository}
}

func (a AddProductUseCase) Execute(input AddProductInputDTO) (AddProductOutputDTO, error) {
	product, err := a.productRepository.Add(input.toDomainEntity())
	if err != nil {
		return AddProductOutputDTO{}, err
	}

	var output AddProductOutputDTO
	output.fromDomainEntity(product)
	return output, nil
}
