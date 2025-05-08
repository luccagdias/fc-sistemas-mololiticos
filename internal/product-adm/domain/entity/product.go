package entity

import "time"

type Product struct {
	ID            string
	name          string
	description   string
	purchasePrice float32
	stock         int
	createdAt     time.Time
	updatedAt     time.Time
}

func NewProduct(ID, name, description string, purchasePrice float32, stock int) Product {
	return Product{
		ID:            ID,
		name:          name,
		description:   description,
		purchasePrice: purchasePrice,
		stock:         stock,
		createdAt:     time.Now(),
		updatedAt:     time.Now(),
	}
}

func (p *Product) GetID() string {
	return p.ID
}

func (p *Product) GetName() string {
	return p.name
}

func (p *Product) GetDescription() string {
	return p.description
}

func (p *Product) GetPurchasePrice() float32 {
	return p.purchasePrice
}

func (p *Product) GetStock() int {
	return p.stock
}

func (p *Product) GetCreatedAt() time.Time {
	return p.createdAt
}

func (p *Product) GetUpdatedAt() time.Time {
	return p.updatedAt
}
