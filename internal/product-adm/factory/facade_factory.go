package factory

import (
	"fmt"
	"github.com/fc-sistemas-monoliticos/internal/product-adm/facade"
	"github.com/fc-sistemas-monoliticos/internal/product-adm/repository"
	addproduct "github.com/fc-sistemas-monoliticos/internal/product-adm/usecase/add-product"
	checkstock "github.com/fc-sistemas-monoliticos/internal/product-adm/usecase/check-stock"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type ProductAdmFacadeFactory struct {
}

func (p *ProductAdmFacadeFactory) newConnection() (*gorm.DB, error) {
	db, err := gorm.Open(sqlite.Open("file::memory:?cache=shared"), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("database connection failed: %v", err)
	}
	return db, nil
}

func (p *ProductAdmFacadeFactory) Create() (facade.ProductAdmFacade, error) {
	db, err := p.newConnection()
	if err != nil {
		return facade.ProductAdmFacade{}, err
	}

	productRepository := repository.NewProductRepository(db)
	addProductUseCase := addproduct.NewAddProductUseCase(productRepository)
	checkStockUseCase := checkstock.NewCheckStockUseCase(productRepository)

	return facade.NewProductAdmFacade(addProductUseCase, checkStockUseCase), nil
}
