package chatController

import (
	"github.com/gin-gonic/gin"
	"github.com/sheason2019/linkme/middleware"
	"github.com/sheason2019/linkme/omi/chat"
	chatService "github.com/sheason2019/linkme/services/chat"
)

func (chatImpl) GetGroup(ctx *gin.Context, searchText string, offset int) chat.GetGroupResponse {
	currentUser := middleware.MustGetCurrentUser(ctx)
	resp := chat.GetGroupResponse{}

	daoConvs, hasMore, err := chatService.FindGroupByNameAndUserId(searchText, currentUser.ID, offset)
	if err != nil {
		panic(err)
	}

	resp.HasMore = &hasMore

	convs := make([]chat.Conversation, len(daoConvs))
	for i, v := range daoConvs {
		convs[i] = v.ToIDL(currentUser.ID)
		convs[i].Members = nil
	}

	resp.Groups = &convs

	return resp
}

func attachGetGroup(r *gin.Engine) {
	r.GET(chat.ChatDefinition.GET_GROUP_PATH, func(ctx *gin.Context) {
		props := chat.GetGroupRequest{}
		ctx.BindQuery(&props)

		ctx.JSON(200, controller.GetGroup(ctx, props.SearchText, props.Offset))
	})
}
