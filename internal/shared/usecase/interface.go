package usecase

//go:generate mockgen -destination=../../../mocks/shared/usecase/usecase.go -package=mocks github.com/fc-sistemas-monoliticos/internal/shared/usecase UseCase
type UseCase[I any, O any] interface {
	Execute(input I) (O, error)
}
