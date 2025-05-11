package port

//go:generate mockgen -destination=../../../../mocks/store-catalog/usecase/find_all_products.go -package=mocks github.com/fc-sistemas-monoliticos/internal/store-catalog/usecase/port FindAllProductsUseCase
type FindAllProductsUseCase interface {
	Execute() ([]FindAllProductsOutputDTO, error)
}

type FindAllProductsOutputDTO struct {
	ID          string
	Name        string
	Description string
	SalesPrice  float32
}
