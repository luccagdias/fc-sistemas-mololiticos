package repository

type ProductModel struct {
	ID          string  `gorm:"primaryKey;autoIncrement:false"`
	Name        string  `gorm:"not null"`
	Description string  `gorm:"not null"`
	SalesPrice  float32 `gorm:"not null"`
}
