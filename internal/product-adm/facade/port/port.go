package port

import (
	addproduct "github.com/fc-sistemas-monoliticos/internal/product-adm/usecase/add-product"
	checkstock "github.com/fc-sistemas-monoliticos/internal/product-adm/usecase/check-stock"
	"time"
)

type AddProductFacadeInputDTO struct {
	Name          string
	Description   string
	PurchasePrice float32
	Stock         int
}

func (a *AddProductFacadeInputDTO) ToUseCaseInput() addproduct.AddProductInputDTO {
	return addproduct.AddProductInputDTO{
		Name:          a.Name,
		Description:   a.Description,
		PurchasePrice: a.PurchasePrice,
		Stock:         a.Stock,
	}
}

type AddProductFacadeOutputDTO struct {
	ID            string
	Name          string
	Description   string
	PurchasePrice float32
	Stock         int
	CreatedAt     time.Time
	UpdatedAt     time.Time
}

func (a *AddProductFacadeOutputDTO) FromUseCaseOutput(product addproduct.AddProductOutputDTO) {
	a.ID = product.ID
	a.Name = product.Name
	a.Description = product.Description
	a.PurchasePrice = product.PurchasePrice
	a.Stock = product.Stock
	a.CreatedAt = product.CreatedAt
	a.UpdatedAt = product.UpdatedAt
}

type CheckStockFacadeInputDTO struct {
	ID string
}

func (c *CheckStockFacadeInputDTO) ToUseCaseInput() checkstock.CheckStockInputDTO {
	return checkstock.CheckStockInputDTO{
		ID: c.ID,
	}
}

type CheckStockFacadeOutputDTO struct {
	ProductID string
	Stock     int
}

func (c *CheckStockFacadeOutputDTO) FromUseCaseOutput(stock checkstock.CheckStockOutputDTO) {
	c.ProductID = stock.ProductID
	c.Stock = stock.Stock
}

type ProductAdmFacadeInterface interface {
	addProduct(input AddProductFacadeInputDTO) (AddProductFacadeOutputDTO, error)
	checkStock(input CheckStockFacadeInputDTO) (CheckStockFacadeOutputDTO, error)
}
