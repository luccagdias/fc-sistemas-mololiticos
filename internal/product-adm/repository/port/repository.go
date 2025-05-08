package port

import "github.com/fc-sistemas-monoliticos/internal/product-adm/domain/entity"

//go:generate mockgen -destination=../../../../mocks/product_repository.go -package=mocks github.com/fc-sistemas-monoliticos/internal/product-adm/repository/port ProductRepository
type ProductRepository interface {
	Add(product entity.Product) (entity.Product, error)
	Find(ID string) (entity.Product, error)
}
