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
		getVersionList: (params) => (ajaxMethod.post('publicircode/v1/manage/getversion', params)),
		getProviderList: () => (ajaxMethod.post('publicircode/v1/manage/getprovider', {'locateid': 0})),
		getIrcodeDetail: (params) => (ajaxMethod.post('publicircode/v1/manage/getircodedetail', params)),
		uploadIrcode: (params, header) => (ajaxMethod.file('publicircode/v1/manage/uploadircodefile', params, header)),
		updateIrcode: (params) => (ajaxMethod.post('publicircode/v1/manage/updateirdata', params)),
		uploadIrcodeFile: (params) => {
			let url = 'publicircode/v1/manage/uploadfuncfile?ircodeid=' + params.ircodeid + '&mtag=' + params.tag;
			return ajaxMethod.file(url, params)
		},
		delIrcodeFile: (params) => {
			// let url = 'publicircode/v1/manage/delfuncfile?ircodeid=' + params.ircodeid + '&mtag=' + params.mtag;
			// return ajaxMethod.post(url)
			let url = 'publicircode/v1/manage/delfuncfile';
			return ajaxMethod.formPost(url, params)
		},
		addIrcode: (params) => (ajaxMethod.post('publicircode/v1/manage/addirdata', params)),
		getLicenseList: (params) => (ajaxMethod.post('publicircode/v1/manage/licenselimitinfo', params)),
		licenseManage: (params) => (ajaxMethod.post('publicircode/v1/manage/licenselimit', params)),
	}
}
