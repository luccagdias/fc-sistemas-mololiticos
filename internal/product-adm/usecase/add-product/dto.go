package add_product

import (
	"github.com/fc-sistemas-monoliticos/internal/product-adm/domain/entity"
	"time"
)

type AddProductInputDTO struct {
	Name          string
	Description   string
	PurchasePrice float32
	Stock         int
}

func (a *AddProductInputDTO) toDomainEntity() entity.Product {
	return entity.Product{
		Name:          a.Name,
		Description:   a.Description,
		PurchasePrice: a.PurchasePrice,
		Stock:         a.Stock,
	}
}

type AddProductOutputDTO struct {
	ID            string
	Name          string
	Description   string
	PurchasePrice float32
	Stock         int
	CreatedAt     time.Time
	UpdatedAt     time.Time
}

func (a *AddProductOutputDTO) fromDomainEntity(product entity.Product) {
	a.ID = product.ID
	a.Name = product.Name
	a.Description = product.Description
	a.PurchasePrice = product.PurchasePrice
	a.Stock = product.Stock
	a.CreatedAt = product.CreatedAt
	a.UpdatedAt = product.UpdatedAt
}
