package todoService

// 检查用户是否有写入指定Series的权限
func CheckUserSeriesLimit(userId, seriesId uint) (bool, error) {
	// 目前简单比对Series中的OwnerId是否为用户ID即可
	series, err := FindSeriesById(seriesId)
	if err != nil {
		return false, err
	}

	return series.OwnerId == userId, nil
}
