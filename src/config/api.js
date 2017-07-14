import ajaxMethod from './ajaxMethod'

export default {
	login: {
		getTimeStamp: () => (ajaxMethod.post('publicircode/v1/manage/login/api')), 
		login: (params, header) => (ajaxMethod.post('publicircode/v1/manage/login/info', params, header))
	},
	ircodeManage: {
		getInfrareList: (params) => (ajaxMethod.post('publicircode/v1/manage/getircodeinfo', params)),
		getDevList: (params) => (ajaxMethod.post('publicircode/v1/manage/getdevtype', params)),
		getBrandList: (params) => (ajaxMethod.post('publicircode/v1/manage/getbrand', params)),
		getStatusList: (params) => {
			let url;
			if(params) {
				url = 'publicircode/v1/manage/getstatuscode?querykey=userircode';
			} else {
				url = 'publicircode/v1/manage/getstatuscode?querykey=default';
			}
			return ajaxMethod.post(url);
		},
		getProviderList: () => (ajaxMethod.post('publicircode/v1/manage/getprovider', {'locateid': 0})),
	}
}
