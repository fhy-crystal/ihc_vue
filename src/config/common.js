export default {
	//undifine 设置为0
	toZero: (val) => {
		if (typeof(val) == "undefined" || val == null || val == '') {
			return val = 0;
		} else {
			return val;
		}
	},
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
	}
}