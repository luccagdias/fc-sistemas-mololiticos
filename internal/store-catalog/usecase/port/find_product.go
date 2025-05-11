package port

//go:generate mockgen -destination=../../../../mocks/store-catalog/usecase/find_product.go -package=mocks github.com/fc-sistemas-monoliticos/internal/store-catalog/usecase/port FindProductUseCase
type FindProductUseCase interface {
	Execute(input FindProductInputDTO) (FindProductOutputDTO, error)
}

type FindProductInputDTO struct {
	ID string
}

type FindProductOutputDTO struct {
	ID          string
	Name        string
	Description string
	SalesPrice  float32
}
