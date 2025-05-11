package repository

import (
	"github.com/fc-sistemas-monoliticos/internal/store-catalog/domain/entity"
	"github.com/fc-sistemas-monoliticos/internal/store-catalog/repository/port"
	"gorm.io/gorm"
)

type ProductRepository struct {
	db *gorm.DB
}

func NewProductRepository(db *gorm.DB) port.Repository {
	return ProductRepository{db: db}
}

func (p ProductRepository) FindAll() ([]entity.Product, error) {
	var products []ProductModel
	err := p.db.Find(&products).Error
	if err != nil {
		return nil, err
	}

	var output []entity.Product
	for _, product := range products {
		output = append(output, entity.Product{
			ID:          product.ID,
			Name:        product.Name,
			Description: product.Description,
			SalesPrice:  product.SalesPrice,
		})
	}
	return output, nil
}

func (p ProductRepository) FindByID(ID string) (entity.Product, error) {
	var product ProductModel
	err := p.db.Where("id = ?", ID).First(&product).Error
	if err != nil {
		return entity.Product{}, err
	}

	return entity.Product{
		ID:          product.ID,
		Name:        product.Name,
		Description: product.Description,
		SalesPrice:  product.SalesPrice,
	}, nil
}
