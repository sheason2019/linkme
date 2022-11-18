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

func Filter[T any](arr []T, matchFunc func(item T, index int) bool) []T {
	ans := make([]T, 0)

	for i, v := range arr {
		if matchFunc(v, i) {
			ans = append(ans, v)
		}
	}

	return ans
}

func Map[T any, R any](arr []T, mapFunc func(item T, index int) R) []R {
	ans := make([]R, len(arr))

	for i, v := range arr {
		ans[i] = mapFunc(v, i)
	}

	return ans
}

func Reverse[T any](arr []T) []T {
	length := len(arr)
	ans := make([]T, length)
	for i, v := range arr {
		ans[length-1-i] = v
	}
	return ans
}
