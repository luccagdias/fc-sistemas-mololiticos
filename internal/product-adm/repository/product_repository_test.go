package repository

import (
	"github.com/fc-sistemas-monoliticos/internal/product-adm/domain/entity"
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"testing"
)

func SetupTestDB(t *testing.T) *gorm.DB {
	db, err := gorm.Open(sqlite.Open("file::memory:?cache=shared"), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Silent),
	})
	if err != nil {
		t.Fatalf("Failed to connect to database: %v", err)
	}

	err = db.AutoMigrate(&ProductModel{})
	if err != nil {
		t.Fatalf("Failed to migrate database schema: %v", err)
	}

	return db
}

func TestProductRepository_Add(t *testing.T) {
	db := SetupTestDB(t)
	sqlDB, err := db.DB()
	if err != nil {
		t.Fatalf("Failed to get underlying database: %v", err)
	}
	defer sqlDB.Close()

	repository := NewProductRepository(db)

	product := entity.Product{
		Name:          "Product Name",
		Description:   "Product Description",
		PurchasePrice: 100,
		Stock:         10,
	}

	newProduct, err := repository.Add(product)

	assert.Nil(t, err)
	assert.NotEmpty(t, newProduct.ID)
	assert.Equal(t, product.Name, newProduct.Name)
	assert.Equal(t, product.Description, newProduct.Description)
	assert.Equal(t, product.PurchasePrice, newProduct.PurchasePrice)
	assert.Equal(t, product.Stock, newProduct.Stock)
}
