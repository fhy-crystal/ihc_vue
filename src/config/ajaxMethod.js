import axios from 'axios'
import urls from './urls'
import {Loading} from 'element-ui';

axios.defaults.baseURL = urls.httpUrl;
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'; // 设置post数据提交方式，默认application/x-www-form-urlencoded表单格式

export default {
	post: function(url, postBody, header) {
		// 创建全屏loading实例
		let loadingInstance = Loading.service({fullscreen: true}); 
		return new Promise((resolve, reject) => {
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
	get: function(url, params) {
		let loadingInstance = Loading.service({fullscreen: true});
		return new Promise((resolve, reject) => {
			axios.get(url, params).then((response) => {
				resolve(response.data);
				loadingInstance.close();
			}, (error) => {
				reject(error);
				loadingInstance.close();
			})
		})
	},
	file: function(url, data) {
		let loadingInstance = Loading.service({fullscreen: true});
		return new Promise((resolve, reject) => {
			let formData = new FormData();
			formData.append('file', data.file)
			axios.post(url, formData, {headers:{'Content-Type':'multiple/form-data'}}).then((response) => {
				resolve(response.data);
				loadingInstance.close();
			}, (error) => {
				reject(error);
				loadingInstance.close();
			})
		})
	}
}