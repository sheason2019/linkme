package adminController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/omi/admin"
	adminService "github.com/sheason2019/linkme/services/admin"
)

func (adminImpl) GetHomepageSatistics(ctx *gin.Context) admin.HomepageSatisticsGroup {
	// 七日内用户数量
	userCount, err := adminService.GetUserCount(30)
	if err != nil {
		panic(err)
	}
	// 七日内会话数量
	conversationCount, err := adminService.GetConversationCount(30)
	if err != nil {
		panic(err)
	}
	// 七日内消息数量
	messageCount, err := adminService.GetMessageCount(30)
	if err != nil {
		panic(err)
	}
	// 七日内UV数量
	uvCount, err := adminService.GetUvCount(30)
	if err != nil {
		panic(err)
	}

	group := admin.HomepageSatisticsGroup{}
	group.UserCounts = &userCount
	group.ConversationCounts = &conversationCount
	group.MessagesCounts = &messageCount
	group.UVCounts = &uvCount

	return group
}

func attachGetHomepageSatistics(r *gin.Engine) {
	r.GET(admin.AdminDefinition.GET_HOMEPAGE_SATISTICS_PATH, func(ctx *gin.Context) {
		ctx.JSON(200, controller.GetHomepageSatistics(ctx))
	})
}
