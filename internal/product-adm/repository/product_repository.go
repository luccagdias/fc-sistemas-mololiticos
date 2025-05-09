package repository

import (
	"github.com/fc-sistemas-monoliticos/internal/product-adm/domain/entity"
	"github.com/fc-sistemas-monoliticos/internal/product-adm/repository/port"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type ProductRepository struct {
	db *gorm.DB
}

func NewProductRepository(db *gorm.DB) port.Repository {
	return ProductRepository{db: db}
}

func (p ProductRepository) Add(product entity.Product) (entity.Product, error) {
	model := ProductModel{
		ID:            uuid.New().String(),
		Name:          product.Name,
		Description:   product.Description,
		PurchasePrice: product.PurchasePrice,
		Stock:         product.Stock,
		CreatedAt:     time.Now(),
		UpdatedAt:     time.Now(),
	}

	err := p.db.Save(&model).Error
	if err != nil {
		return entity.Product{}, err
	}

	return model.toDomainEntity(), nil
}

func (p ProductRepository) Find(ID string) (entity.Product, error) {
	//TODO implement me
	panic("implement me")
}
