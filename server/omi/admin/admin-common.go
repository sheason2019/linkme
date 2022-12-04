/**
* 本文件由Omi.js自动生成，谨慎改动！
* 生成时间：2022年12月4日 18:19:36.
 */
package admin

type SatisticsItem struct {
	Label *string
	Count *int
}
type HomepageSatisticsGroup struct {
	UserCounts         *[]SatisticsItem
	ConversationCounts *[]SatisticsItem
	MessagesCounts     *[]SatisticsItem
	UVCounts           *[]SatisticsItem
}
