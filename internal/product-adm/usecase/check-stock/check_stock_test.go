package check_stock

import (
	"errors"
	"github.com/fc-sistemas-monoliticos/internal/product-adm/domain/entity"
	"github.com/fc-sistemas-monoliticos/mocks/product-adm"
	"github.com/stretchr/testify/assert"
	"go.uber.org/mock/gomock"
	"testing"
)

func TestCheckStockUseCase_Execute(t *testing.T) {
	tests := []struct {
		description        string
		input              CheckStockInputDTO
		expected           CheckStockOutputDTO
		repositoryResponse entity.Product
		repositoryError    error
		expectError        bool
	}{
		{
			description: "should return the stock of a product",
			input: CheckStockInputDTO{
				ID: "1",
			},
			expected: CheckStockOutputDTO{
				ProductID: "1",
				Stock:     10,
			},
			repositoryResponse: entity.Product{ID: "1", Stock: 10},
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
			repository := mocks.NewMockRepository(gomock.NewController(t))
			repository.EXPECT().Find(test.input.ID).Return(test.repositoryResponse, test.repositoryError).Times(1)
			usecase := NewCheckStockUseCase(repository)

			result, err := usecase.Execute(test.input)

			if test.expectError {
				assert.Error(t, err)
			} else {
				assert.Nil(t, err)
				assert.Equal(t, test.expected.ProductID, result.ProductID)
				assert.Equal(t, test.expected.Stock, result.Stock)

			}
		})
	}
}
