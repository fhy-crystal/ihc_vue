export default {
	//undifine 设置为0
	toZero: (val) => {
		if (typeof(val) == "undefined" || val == null || val == '') {
			return val = 0;
		} else {
			return val;
		}
	},
	// 格式化时间戳，返回yyyy-MM-dd
	formatTime: (timestamp) => {
		let ms = new Date(timestamp),
			year = ms.getFullYear(),
			month = ms.getMonth() + 1,
			day = ms.getDate(),
			h = ms.getHours(),
			m = ms.getMinutes(),
			s = ms.getSeconds();
		month = month < 10 ? ("0" + month) : month; //如果月份小于10，在前面加0
		day = day < 10 ? ("0" + day) : day;
		h = h < 10 ? ("0" + h) : h;
		m = m < 10 ? ("0" + m) : m;
		s = s < 10 ? ("0" + s) : s;
		return year + "-" + month + "-" + day; 
	},
	// 检查文件大小
	getFileObjAndSize: (target, maxSize) => {
		if (target) {
			let resultFile = '', 
				filesize = 0,
				ksize = 0;
			if (!target.files) {
				alert('暂不支持该浏览器');
				return false;
			} else {
				// 文件
				resultFile = target.files[0];
				// 文件大小
				filesize = resultFile.size;
			}

			ksize = filesize/1024;
			if (ksize > maxSize) {
				alert('附件大小不能大于' + maxSize + '！当前为：' + parseInt(ksize) + 'K');
				return false;
			} else if (ksize <= 0) {
				alert('附件大小为0！');
				return false;
			}
			return resultFile;
		} else {
			alert('请选择文件！');
		}
		
	}
}