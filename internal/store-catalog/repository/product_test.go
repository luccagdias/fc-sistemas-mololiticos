package repository

import (
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

func seedTestData(db *gorm.DB, t *testing.T) {
	products := []ProductModel{
		{ID: "1", Name: "Product 1", Description: "Description 1", SalesPrice: 1.0},
		{ID: "2", Name: "Product 2", Description: "Description 2", SalesPrice: 1.0},
		{ID: "3", Name: "Product 3", Description: "Description 3", SalesPrice: 1.0},
	}

	for _, product := range products {
		if err := db.Create(&product).Error; err != nil {
			t.Fatalf("Failed to seed test data: %v", err)
		}
	}
}

func TestProductRepository_FindAll(t *testing.T) {
	db := SetupTestDB(t)
	sqlDB, err := db.DB()
	if err != nil {
		t.Fatalf("Failed to get underlying database: %v", err)
	}
	defer sqlDB.Close()

	seedTestData(db, t)

	repository := NewProductRepository(db)
	products, err := repository.FindAll()

	assert.Nil(t, err)
	assert.Equal(t, 3, len(products))
	assert.Equal(t, products[0].ID, "1")
	assert.Equal(t, products[0].Name, "Product 1")
	assert.Equal(t, products[1].ID, "2")
	assert.Equal(t, products[1].Name, "Product 2")
	assert.Equal(t, products[2].ID, "3")
	assert.Equal(t, products[2].Name, "Product 3")
}

func TestProductRepository_FindByID(t *testing.T) {
	db := SetupTestDB(t)
	sqlDB, err := db.DB()
	if err != nil {
		t.Fatalf("Failed to get underlying database: %v", err)
	}
	defer sqlDB.Close()

	seedTestData(db, t)

	repository := NewProductRepository(db)
	product, err := repository.FindByID("1")

	assert.Nil(t, err)
	assert.Equal(t, product.ID, "1")
	assert.Equal(t, product.Name, "Product 1")
}
