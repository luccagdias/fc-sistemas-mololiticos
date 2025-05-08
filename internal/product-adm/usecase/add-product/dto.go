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
	return entity.NewProduct("1", a.Name, a.Description, a.PurchasePrice, a.Stock)
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
	a.Name = product.GetName()
	a.Description = product.GetDescription()
	a.PurchasePrice = product.GetPurchasePrice()
	a.Stock = product.GetStock()
	a.CreatedAt = product.GetCreatedAt()
	a.UpdatedAt = product.GetUpdatedAt()
}
