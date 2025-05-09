package entity

import "time"

type Product struct {
	ID            string
	Name          string
	Description   string
	PurchasePrice float32
	Stock         int
	CreatedAt     time.Time
	UpdatedAt     time.Time
}
