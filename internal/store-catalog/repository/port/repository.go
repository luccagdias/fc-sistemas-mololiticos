package port

import "github.com/fc-sistemas-monoliticos/internal/store-catalog/domain/entity"

//go:generate mockgen -destination=../../../../mocks/store-catalog/repository/repository.go -package=mocks github.com/fc-sistemas-monoliticos/internal/store-catalog/repository/port Repository
type Repository interface {
	FindAll() ([]entity.Product, error)
	FindByID(ID string) (entity.Product, error)
}
