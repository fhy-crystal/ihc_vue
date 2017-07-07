import ajaxMethod from './ajaxMethod'

export default {
	login: {
		getTimeStamp: () => (ajaxMethod.post('publicircode/v1/manage/login/api')), 
		login: (params, header) => (ajaxMethod.post('publicircode/v1/manage/login/info', params, header))
	},
	ircodeManage: {
		getInfrareList: (params) => (ajaxMethod.post('publicircode/v1/manage/getircodeinfo', params))
	}
}
