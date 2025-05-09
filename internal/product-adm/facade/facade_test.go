package facade

import (
	"github.com/fc-sistemas-monoliticos/internal/product-adm/facade/port"
	addproduct "github.com/fc-sistemas-monoliticos/internal/product-adm/usecase/add-product"
	checkstock "github.com/fc-sistemas-monoliticos/internal/product-adm/usecase/check-stock"
	mocks "github.com/fc-sistemas-monoliticos/mocks/shared/usecase"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"go.uber.org/mock/gomock"
	"testing"
	"time"
)

func TestProductAdmFacade_AddProduct(t *testing.T) {
	input := port.AddProductFacadeInputDTO{
		Name:          "Product 1",
		Description:   "Product Description 1",
		PurchasePrice: 100.0,
		Stock:         10,
	}

	expectedID := uuid.New().String()

	useCaseResponse := addproduct.AddProductOutputDTO{
		ID:            expectedID,
		Name:          input.Name,
		Description:   input.Description,
		PurchasePrice: input.PurchasePrice,
		Stock:         input.Stock,
		CreatedAt:     time.Now(),
		UpdatedAt:     time.Now(),
	}

	mockAddProductUseCase := mocks.NewMockUseCase[addproduct.AddProductInputDTO, addproduct.AddProductOutputDTO](gomock.NewController(t))
	mockAddProductUseCase.EXPECT().Execute(gomock.Any()).Return(useCaseResponse, nil)
	facade := NewProductAdmFacade(mockAddProductUseCase, nil)

	output, err := facade.AddProduct(input)

	assert.Nil(t, err)
	assert.Equal(t, expectedID, output.ID)
	assert.Equal(t, input.Name, output.Name)
	assert.Equal(t, input.Description, output.Description)
	assert.Equal(t, input.PurchasePrice, output.PurchasePrice)
	assert.Equal(t, input.Stock, output.Stock)
	assert.Equal(t, useCaseResponse.CreatedAt, output.CreatedAt)
	assert.Equal(t, useCaseResponse.UpdatedAt, output.UpdatedAt)
}

func TestProductAdmFacade_CheckStock(t *testing.T) {
	productID := uuid.New().String()
	input := port.CheckStockFacadeInputDTO{
		ID: productID,
	}

	useCaseResponse := checkstock.CheckStockOutputDTO{
		ProductID: productID,
		Stock:     10,
	}

	mockCheckStockUseCase := mocks.NewMockUseCase[checkstock.CheckStockInputDTO, checkstock.CheckStockOutputDTO](gomock.NewController(t))
	mockCheckStockUseCase.EXPECT().Execute(gomock.Any()).Return(useCaseResponse, nil)
	facade := NewProductAdmFacade(nil, mockCheckStockUseCase)

	output, err := facade.CheckStock(input)

	assert.Nil(t, err)
	assert.Equal(t, productID, output.ProductID)
	assert.Equal(t, 10, output.Stock)
}
