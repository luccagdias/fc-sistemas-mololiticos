package check_stock

type CheckStockInputDTO struct {
	ID string
}

type CheckStockOutputDTO struct {
	ProductID string
	Stock     int
}
