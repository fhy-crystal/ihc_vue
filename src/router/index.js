import Vue from 'vue'
import Router from 'vue-router'

// pages
import Login from '@/pages/login'

import ircodeManage from '@/pages/ircodeManage/infrared/index'
import ircodeManageSubBlock from '@/pages/ircodeManage/infrared/subBlock'
import InfraredRepo from '@/pages/ircodeManage/infrared/infraredRepo'
import InfraredDetail from '@/pages/ircodeManage/infrared/InfraredDetail'
import InfraredAdd from '@/pages/ircodeManage/infrared/InfraredAdd'
import licenseManage from '@/pages/ircodeManage/infrared/license'

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
			path: '/ircodeTvManage',
			name: 'ircodeTvManage',
			component: ircodeManageSubBlock,
			redirect: '/ircodeTvManage/ircodeManage/list',
			children: [
				{
					path: '/ircodeTvManage/ircodeManage',
					name: 'ircodeManage',
					redirect: '/ircodeTvManage/ircodeManage/list',
					component: ircodeManage,
					children: [
						{
							path: '/ircodeTvManage/ircodeManage/list',
							name: 'ircodeManageList',
							component: InfraredRepo
						},
						{
							path: '/ircodeTvManage/ircodeManage/list/Detail',
							name: 'ircodeManageDetail',
							component: InfraredDetail
						},
						{
							path: '/ircodeTvManage/ircodeManage/add',
							name: 'ircodeManageAdd',
							component: InfraredAdd
						},
						{
							path: '/ircodeTvManage/ircodeManage/license',
							name: 'licenseManage',
							component: licenseManage
						}
					]
				},
				// {
				// 	path: '/ircodeTvManage/ircodeManage/list/Detail',
				// 	name: 'ircodeManageDetail',
				// 	component: InfraredDetail
				// },
				// {
				// 	path: '/ircodeTvManage/ircodeManage/add',
				// 	name: 'ircodeManageAdd',
				// 	component: InfraredAdd
				// }
			]
		}
	]
})
