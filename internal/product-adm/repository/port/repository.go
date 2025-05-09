package port

import "github.com/fc-sistemas-monoliticos/internal/product-adm/domain/entity"

//go:generate mockgen -destination=../../../../mocks/product-adm/repository.go -package=mocks github.com/fc-sistemas-monoliticos/internal/product-adm/repository/port Repository
type Repository interface {
	Add(product entity.Product) (entity.Product, error)
	Find(ID string) (entity.Product, error)
}
