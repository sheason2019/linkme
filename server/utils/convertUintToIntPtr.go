package utils

func ConvertNumberToIntPtr[T uint | int64](num T) *int {
	temp := int(num)
	return &temp
}
