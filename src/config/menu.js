export default {
	top: [
		{
			name: "码库/电视频道",
			path: "/ircodeManage"
		},{
			name: "数据统计",
			path: "/dataManage"
		},{
			name: "BUG统计",
			path: "/bugStatistics"
		},{
			name: "产品发布",
			path: "/productManage"
		},{
			name: "语音管理",
			path: "/voiceManage"
		},{
			name: "推送中心",
			path: "/notificationManage"
		}
	],

	ircodeManage: {
		name: "红外码库管理",
		list:[
		{
			name: "码库查询",
			path:"/ircodeManage/list"
		},{
			name: "新增码",
			path:"/ircodeManage/add"
		},{
			name: "license管理",
			path:"/ircodeManage/license"
		}]
	}
}