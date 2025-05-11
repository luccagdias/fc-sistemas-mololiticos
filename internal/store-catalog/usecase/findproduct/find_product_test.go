package findproduct

import (
	"github.com/fc-sistemas-monoliticos/internal/store-catalog/domain/entity"
	"github.com/fc-sistemas-monoliticos/internal/store-catalog/usecase/port"
	mocks "github.com/fc-sistemas-monoliticos/mocks/store-catalog/repository"
	"github.com/stretchr/testify/assert"
	"go.uber.org/mock/gomock"
	"testing"
)

var product = entity.Product{
	ID:          "1",
	Name:        "Product 1",
	Description: "Product Description 1",
	SalesPrice:  100.0,
}

var expectedOutput = port.FindProductOutputDTO{
	ID:          "1",
	Name:        "Product 1",
	Description: "Product Description 1",
	SalesPrice:  100.0,
}

func TestFindProductUseCase_Execute(t *testing.T) {
	repository := mocks.NewMockRepository(gomock.NewController(t))
	repository.EXPECT().FindByID(gomock.Any()).Return(product, nil)
	useCase := NewFindProductUseCase(repository)

	output, _ := useCase.Execute(port.FindProductInputDTO{ID: "1"})

	assert.Equal(t, expectedOutput, output)
}
