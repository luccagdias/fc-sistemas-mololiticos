package add_product

import (
	"errors"
	"github.com/fc-sistemas-monoliticos/internal/product-adm/domain/entity"
	"github.com/fc-sistemas-monoliticos/mocks"
	"github.com/stretchr/testify/assert"
	"go.uber.org/mock/gomock"
	"testing"
	"time"
)

func TestAddProductUseCase_Execute(t *testing.T) {
	tests := []struct {
		description        string
		input              AddProductInputDTO
		expected           AddProductOutputDTO
		repositoryResponse entity.Product
		repositoryError    error
		expectError        bool
	}{
		{
			description: "should return a product",
			input: AddProductInputDTO{
				Name:          "name",
				Description:   "description",
				PurchasePrice: 100,
				Stock:         10,
			},
			expected: AddProductOutputDTO{
				ID:            "1",
				Name:          "Product Name",
				Description:   "Product Description",
				PurchasePrice: 100,
				Stock:         10,
				CreatedAt:     time.Now(),
				UpdatedAt:     time.Now(),
			},
			repositoryResponse: entity.NewProduct("1", "Product Name", "Product Description", 100, 10),
			expectError:        false,
		},
		{
			description:     "should return an error",
			repositoryError: errors.New("error"),
			expectError:     true,
		},
	}
	for _, test := range tests {
		t.Run(test.description, func(t *testing.T) {
			ctrl := gomock.NewController(t)
			productRepository := mocks.NewMockProductRepository(ctrl)
			productRepository.EXPECT().Add(gomock.Any()).Return(test.repositoryResponse, test.repositoryError).Times(1)
			usecase := NewAddProductUseCase(productRepository)

			result, err := usecase.Execute(test.input)

			if test.expectError {
				assert.Error(t, err)
			} else {
				assert.Nil(t, err)
				assert.Equal(t, test.expected.ID, result.ID)
				assert.Equal(t, test.expected.Name, result.Name)
				assert.Equal(t, test.expected.Description, result.Description)
				assert.Equal(t, test.expected.PurchasePrice, result.PurchasePrice)
				assert.Equal(t, test.expected.Stock, result.Stock)
				assert.NotNil(t, result.CreatedAt)
				assert.NotNil(t, result.UpdatedAt)
			}
		})
	}
}
