package repository

import (
	"github.com/fc-sistemas-monoliticos/internal/product-adm/domain/entity"
	"time"
)

type ProductModel struct {
	ID            string    `gorm:"primaryKey;autoIncrement:false"`
	Name          string    `gorm:"not null"`
	Description   string    `gorm:"not null"`
	PurchasePrice float32   `gorm:"not null"`
	Stock         int       `gorm:"not null"`
	CreatedAt     time.Time `gorm:"not null"`
	UpdatedAt     time.Time `gorm:"not null"`
}

func (p *ProductModel) toDomainEntity() entity.Product {
	return entity.Product{
		ID:            p.ID,
		Name:          p.Name,
		Description:   p.Description,
		PurchasePrice: p.PurchasePrice,
		Stock:         p.Stock,
		CreatedAt:     p.CreatedAt,
		UpdatedAt:     p.UpdatedAt,
	}
}
