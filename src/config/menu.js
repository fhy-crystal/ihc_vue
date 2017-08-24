export default {
	top: [
		{
			name: "码库/电视频道",
			path: "/ircodeTvManage"
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
		subMenu: [{
			name: "红外码库管理",
			path:"/ircodeTvManage/ircodeManage"
		},{
			name: "用户码库",
			path:"/ircodeTvManage/userRepo"
		},{
			name: "电视频道管理",
			path:"/ircodeTvManage/tvManage"
		},{
			name: "设置",
			path:"/ircodeTvManage/setting"
		}],
		ircodeList:[
		{
			name: "码库查询",
			path:"/ircodeTvManage/ircodeManage/list"
		},{
			name: "新增码",
			path:"/ircodeTvManage/ircodeManage/add"
		},{
			name: "license管理",
			path:"/ircodeTvManage/ircodeManage/license"
		}]
	}
}