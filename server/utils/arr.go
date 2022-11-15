package utils

func ExchangeItem[T any | uint](arr []T, indexA, indexB int) {
	temp := arr[indexA]
	arr[indexA] = arr[indexB]
	arr[indexB] = temp
}

func Exist[T int | uint](arr []T, value T) (bool, int) {
	for i, v := range arr {
		if v == value {
			return true, i
		}
	}
	return false, 0
}
