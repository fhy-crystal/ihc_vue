import axios from 'axios'
import * as Cookies from 'js-cookie';
import {Loading} from 'element-ui';
import querystring from 'querystring'; // 序列化参数
import urls from './urls'

axios.defaults.baseURL = urls.httpUrl;
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'; // 设置post数据提交方式，默认application/x-www-form-urlencoded表单格式

let resetCookie = () =>{
	axios.defaults.headers.common = {
		ReqUserId: Cookies.get('ReqUserId'),
		ReqUserSession: Cookies.get('ReqUserSession'),
		ReqType: "manage",
		ManageGroupType: Cookies.get('ManageGroupType') ? Cookies.get("ManageGroupType") : undefined,
		ManageGroupId:Cookies.get("ManageGroupId") ? Cookies.get("ManageGroupId") : undefined
	}
}

export default {
	// form表单格式提交?a=xx&b=xx
	formPost(url, postBody, header) {
		axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
		// 创建全屏loading实例
		let loadingInstance = Loading.service({fullscreen: true}); 
		return new Promise((resolve, reject) => {
			resetCookie();
			header = Object.assign(axios.defaults.headers.common, header);
			axios.post(url, querystring.stringify(postBody), {headers:header}).then((response) => {
				resolve(response.data);
				// 关闭实例
				loadingInstance.close();
			}, (error) => {
				reject(error);
				loadingInstance.close();
			})
		})
	},
	post(url, postBody, header) {
		// 创建全屏loading实例
		let loadingInstance = Loading.service({fullscreen: true}); 
		return new Promise((resolve, reject) => {
			resetCookie();
			header = Object.assign(axios.defaults.headers.common, header);
			axios.post(url, JSON.stringify(postBody), {headers:header}).then((response) => {
				resolve(response.data);
				// 关闭实例
				loadingInstance.close();
			}, (error) => {
				reject(error);
				loadingInstance.close();
			})
		})
	},
	get(url, params, header) {
		let loadingInstance = Loading.service({fullscreen: true});
		return new Promise((resolve, reject) => {
			resetCookie();
			header = Object.assign(axios.defaults.headers.common, header);
			axios.get(url, params).then((response) => {
				resolve(response.data);
				loadingInstance.close();
			}, (error) => {
				reject(error);
				loadingInstance.close();
			})
		})
	},
	file(url, data, header) {
		let loadingInstance = Loading.service({fullscreen: true});
		return new Promise((resolve, reject) => {
			resetCookie();
			header = Object.assign(axios.defaults.headers.common, header);
			let formData = new FormData();
			formData.append('file', data.file)
			axios.post(url, formData, {headers:{'Content-Type':'multiple/form-data'}}).then((response) => {
				resolve(response.data);
				// 关闭实例
				loadingInstance.close();
			}, (error) => {
				reject(error);
				loadingInstance.close();
			})
		})
	}
}