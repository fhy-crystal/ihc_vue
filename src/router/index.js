import Vue from 'vue'
import Router from 'vue-router'

// pages
import Login from '@/pages/login'

import ircodeManage from '@/pages/ircodeManage/infrared/index'
import InfraredRepo from '@/pages/ircodeManage/infrared/infraredRepo'
import InfraredDetail from '@/pages/ircodeManage/infrared/InfraredDetail'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '',
			redirect: '/login'
		},{
			path: '/',
			redirect: '/login'
		},{
			path: '/login',
			name: 'Login',
			component: Login
		},{
			path: '/ircodeManage',
			name: 'ircodeManage',
			component: ircodeManage,
			redirect: '/ircodeManage/list',
			children: [
				{
					path: '/ircodeManage/list',
					name: 'ircodeManageList',
					component: InfraredRepo
				},
				{
					path: '/ircodeManage/Detail',
					name: 'ircodeManageDetail',
					component: InfraredDetail
				}
			]
		}
	]
})
