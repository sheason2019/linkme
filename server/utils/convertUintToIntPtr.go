package utils

func ConvertNumberToIntPtr[T int | uint | int64](num T) *int {
	temp := int(num)
	return &temp
}
