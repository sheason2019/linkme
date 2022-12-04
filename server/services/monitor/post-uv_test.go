package monitor_service_test

import (
	"testing"

	monitor_service "github.com/sheason2019/linkme/services/monitor"
)

func TestPostUv(t *testing.T) {
	ip := "mock_ip"
	err := monitor_service.PostUV(ip)
	if err != nil {
		t.Error(err)
	}
}
