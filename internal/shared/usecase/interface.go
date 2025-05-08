package usecase

type UseCase[I any, O any] interface {
	Execute(input I) (O, error)
}
