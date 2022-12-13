package utils

func ConvertPointToNumber[T int](point *T) T {
	if point == nil {
		return 0
	} else {
		return *point
	}
}
