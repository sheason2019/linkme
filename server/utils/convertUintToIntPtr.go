package utils

func ConvertUintToIntPtr(num uint) *int {
	temp := int(num)
	return &temp
}
