/*
// ******************************** 错误案例1 ********************************
const deepCopy = (obj1) => {
	const type = Object.prototype.toString.call(obj1);
	const resObj = null;
	// 引用类型
	if (type.includes('object')) {
		if (type === '[object Object]') {
			resObj = [];
			for (const i = 0; i < obj1.length; i++) {
				if (typeof obj1[i] !== 'object') {
					resObj[i] = deepCopy(resObj[i]);
				} else {
					resObj[i] = obj1[i];
				}
			}
		}
		if (type === '[object Array]') {
			resObj = {};
			for (const key in obj1) {
				if (typeof obj1[key] !== 'object') {
					resObj[key] = deepCopy(obj1[key]);
				} else {
					resObj[key] = obj1[key];
				}
			}
		}
	} else {
		// 基本类型
		resObj = obj1;
	}
	return resObj;
};


// ******************************** 错误案例2 ********************************
const transfRgba = (str, opacity) => {
	// 16进制颜色值的正则
	const reg = /#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	// 把颜色值变成小写
	let color = str.toLocaleUpperCase();
	if (reg.test(color)) {
		// 如果只有三位的值，需变成六位，如：#fff => #ffffff
		if (color.length === 3) {
			let colorNew = "#";
			for (let i = 1; i < 4; i += 1) {
				colorNew = color.slice(i, i + 1).concat(color.slice(i, i + 1));
			}
			color = colorNew;
		}
		// 处理六位的颜色值，转为RGB
		let colorChange = {};
		for (let i = 1; i < 8; i += 2) {
			colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
		}
		return `rgba(${colorChange.join(",")}${ typeof opacity === 'string' ? `,${opacity}` : 1})`;
	} else {
		return color;
	}
}


// ******************************** 错误案例3 *******************************
class Debounce {
	isDelay = false;
	timer = null;

	debounce(callback, delay = 200) {
		clearInterval(this.timer);
		this.timer = setTimeout(() => {
			return callback();
		}, delay);
	}

	throttle(callback, delay = 200) {
		if (!this.isDelay) {
			setTimeout(() => {
				this.isDelay = false;
			}, delay);
			this.isDelay = true;
			return callback();
		}
	}
}

const debounceFunc = new Debounce().throttle;

const params = {
    keyword: '',
    year: new Date().getYear(),
    pageNum: 1,
}

const getList = ({ type, value }) => {
    params = {
        type: value,
        ...params,
    };
    debounceFunc(() => {
        console.log('获取列表参数：： ', params)
    });
}

getList({ type: 'keyword', value: '企业' });
getList({ typ: 'year', value: 2020 });
getList({ type: 'pageSize', value: 2 });

*/


// **************** 正确案例1，错误内容 7 处 ****************
const deepCopy = (obj1) => {
	const type = Object.prototype.toString.call(obj1);
	let resObj = null; // => const
	// 引用类型
	if (type.includes('object')) {
		if (type === '[object Array]') { // => [object Object]
			resObj = [];
			for (let i = 0; i < obj1.length; i++) { // => const
				if (typeof obj1[i] === 'object') { // => !==
					resObj[i] = deepCopy(obj1[i]); // => resObj
				} else {
					resObj[i] = obj1[i];
				}
			}
		}
		if (type === '[object Object]') { // => [object Array]
			resObj = {};
			for (const key in obj1) {
				if (typeof obj1[key] === 'object') { // => !==
					resObj[key] = deepCopy(obj1[key]);
				} else {
					resObj[key] = obj1[key];
				}
			}
		}
	} else {
		// 基本类型
		resObj = obj1;
	}
	return resObj;
};


// **************** 正确案例2，错误内容 7 处 ****************
const transfRgba = (str, opacity) => {
	// 16进制颜色值的正则
	const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/; // => /#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
	// 把颜色值变成小写
	let color = str.toLowerCase(); // => toLocaleUpperCase
	if (reg.test(color)) {
		// 如果只有三位的值，需变成六位，如：#fff => #ffffff
		if (color.length === 4) { // => 3
			let colorNew = "#";
			for (let i = 1; i < 4; i += 1) {
				colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1)); // => =
			}
			color = colorNew;
		}
		// 处理六位的颜色值，转为RGB
		let colorChange = []; // => {}
		for (let i = 1; i < 7; i += 2) { // => 8
			colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
		}
		return `rgba(${colorChange.join(",")}${ typeof opacity === 'number' ? `,${opacity}` : 1})`; // => string
	} else {
		return color;
	}
}
console.log('transfRgba: ', transfRgba('#fff', 0.5))


// **************** 正确案例3，错误内容 7 处 ****************
class Debounce {
	isDelay = false;
	timer = null;

	debounce(callback, delay = 200) {
		clearTimeout(this.timer);  // => clearInterval
		this.timer = setTimeout(() => {
			return callback();
		}, delay);
	}

	throttle(callback, delay = 200) {
		if (!this.isDelay) {
			setTimeout(() => {
				this.isDelay = false;
			}, delay);
			this.isDelay = true;
			return callback();
		}
	}
}

const debounceFunc = new Debounce(); // => new Debounce().throttle;

let params = { // => cosnt
    keyword: '',
    year: new Date().getFullYear(), // => new Date().getYear()
    pageNum: 1,
}

const getList = ({ type, value }) => {
    params = {
        ...params,  // => 结构位置错误
        [type]: value, // => type: value,
    };
    debounceFunc.debounce(() => {
        console.log('获取列表参数： ', params)
    });
}

getList({ type: 'keyword', value: '企业' });
getList({ type: 'year', value: 2020 });
getList({ type: 'pageNum', value: 2 }); // => pageSize