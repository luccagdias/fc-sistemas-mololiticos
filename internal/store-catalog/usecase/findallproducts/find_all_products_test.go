package findallproducts

import (
	"github.com/fc-sistemas-monoliticos/internal/store-catalog/domain/entity"
	"github.com/fc-sistemas-monoliticos/internal/store-catalog/usecase/port"
	mocks "github.com/fc-sistemas-monoliticos/mocks/store-catalog/repository"
	"github.com/stretchr/testify/assert"
	"go.uber.org/mock/gomock"
	"testing"
)

var expectedOutput = []port.FindAllProductsOutputDTO{
	{
		ID:          "1",
		Name:        "Product 1",
		Description: "Product Description 1",
		SalesPrice:  100.0,
	},
	{
		ID:          "2",
		Name:        "Product 2",
		Description: "Product Description 2",
		SalesPrice:  200.0,
	},
}

var repositoryOutput = []entity.Product{
	{
		ID:          "1",
		Name:        "Product 1",
		Description: "Product Description 1",
		SalesPrice:  100.0,
	},
	{
		ID:          "2",
		Name:        "Product 2",
		Description: "Product Description 2",
		SalesPrice:  200.0,
	},
}

func TestFindAllProductsUseCase_Execute(t *testing.T) {
	repository := mocks.NewMockRepository(gomock.NewController(t))
	repository.EXPECT().FindAll().Return(repositoryOutput, nil).Times(1)
	useCase := NewFindAllProductsUseCase(repository)

	output, _ := useCase.Execute()

	assert.Equal(t, expectedOutput, output)
}
