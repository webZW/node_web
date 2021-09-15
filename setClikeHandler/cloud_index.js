const fs = require('fs');
const btnType = require('./clickConfig'),
      btnTypeJson = {};

let isEnptyNameNum = 0, // 空名称数量
	enptyNameArr = [], // 空名称数组
    specialDescNum = 0, // 特殊描述数量
	specialDescArr = [], // 特殊描述数组
	buriedPointArr = [], // 特殊描述数组
	isHasNameNum = 0, // 有名称数量
    pathArr = [];

let parameters = {
	project: 'poi-cloud-operation',
	path: '/Users/zw_mac/POI_DEVELOP/poi-cloud-operation/src/components/lib',
	router_path: '/Users/zw_mac/POI_DEVELOP/poi-cloud-operation/src/router/router_menu.ts',
	regular: /@click.+?[\s\S|\d|\D|\w\W]*?<\/.+/g,
	is_treatment_sub_file: true
};
// path 文件夾路徑 例如 './View'
// regular 要替換的正則匹配規則 例如 '/.css"/gm'
// is_treatment_sub_file 是否需要遍歷子文件夾 默認為true

for (const key in btnType) {
    btnType[key].map(name => {
        btnTypeJson[name] = key;
    })
}

// 递归文件
const recursiveFile = (paramsConfig) => {
	//读取文件，并且替换文件中指定的字符串
	fs.readdir(paramsConfig.path, function (err, files) {
		if (err) return err;
		if (files.length < 1) return;
        // console.log(3333, paramsConfig, files);

        fs_file({ paramsConfig, files })
		
	});
}

const getRouterPathArr = () => {
    const routerTemp = fs.readFileSync(parameters.router_path, 'utf8');
    pathArr = routerTemp.match(/path.+?[\s\S|\d|\D|\w\W]*?\.vue/g);
    
    recursiveFile(parameters);
}

getRouterPathArr();

const fs_file =({ paramsConfig, files, index = 0 }) => {
    if (files.length <= index) return;

    const item = files[index];

    let this_path = paramsConfig.path + '/' + item;
    //判断文件的状态，用于区分文件名/文件夹
    fs.stat(this_path, function (err, status) {
        if (err) {
            console.log(9999, err)
            return err;
        }
        let isFile = status.isFile();//是文件
        let isDir = status.isDirectory();//是文件夹
        if (isFile) {
            if(!/vue/.test(this_path)) return fs_file({ paramsConfig, files, index: ++index });

            let html = fs.readFileSync(this_path, 'utf8');

            const config = html.match(paramsConfig.regular) || [];
            // console.log(this_path, config)
            if (config.length < 1) return fs_file({ paramsConfig, files, index: ++index });
            const nameArr = analysisClick({ config, this_path });
            const path = getRouterPath(this_path);
            setClickFunc({ html, this_path, path, nameArr });
        }
        if (isDir && paramsConfig.is_treatment_sub_file) {
            const config = {
                ...paramsConfig,
                path: this_path,
            };
            // console.log(222, config);
            recursiveFile(config);
        }

        fs_file({ paramsConfig, files, index: ++index });
    });
}

// 分析埋点类型、名称
const analysisClick = ({ config, this_path}) => {
	let nameArr = [];
	for (const str of config) {
		if (!str) {continue;}
		const descArr = str.match(/([\u4e00-\u9fa5](\s)*)+/g);
		const desc = Array.isArray(descArr) ? descArr[0].replace(/\s+/g, '') : '';
		nameArr.push(desc);
        
        // 收集名称为空 & 特色名称的内容
        const path = this_path;
		if (!desc) {
			++isEnptyNameNum;
			enptyNameArr.push({ path: this_path, str });
		} else ++isHasNameNum;

        if (!btnTypeJson[desc] && !!desc) {
            ++specialDescNum
            specialDescArr.push({  path: this_path, desc, str  });
        }
	}

	return nameArr;
};

// 获取路由名
const getRouterPath = (full_path) => {
    const path = full_path.match(/lib\/(\w+)/)[1];
    const now_path = pathArr.filter(str => RegExp(path).test(str))[0];
    !now_path && console.log(122, {pathArr, path, now_path, full_path})
    const pathStr = now_path.match(/path.+\/(\w+)\'.+/);
    return pathStr[1];
}

// 埋点
const setClickFunc = ({ html, this_path, path, nameArr }) => {
	// console.log(555, { nameArr })
	let index = 0;
	let new_html = html.replace(/@click/g, (str, num, temp) => {
		++index;
		// 判断之前是否已经埋点
        const tempStr = temp.substring(num - 80, num + 80)
		const isSet = /buriedPointId/.test(tempStr);
		if (isSet) return '@click';

        const id = `${path}_${btnTypeJson[nameArr[index - 1]] || 'other'}_${(Math.random() * Math.pow(10, 6)).toFixed(0)}`;
        buriedPointArr.push({ path, type: btnTypeJson[nameArr[index - 1]] || 'other', name: nameArr[index - 1] || id, id,  });

		return `buriedPointId="${id}" @click`;
	});

	fs.writeFileSync(this_path, new_html, 'utf8');
};


setTimeout(() => {
    const jsonStr = JSON.stringify({ isEnptyNameNum, isHasNameNum, specialDescNum, buriedPointNum: buriedPointArr.length, enptyNameArr, specialDescArr }, null, 4);
    const fileName = `${parameters.project}_${new Date().toLocaleString()}`;
	fs.writeFileSync(`./clcikMsg/${fileName}.json`, jsonStr);
	fs.writeFileSync(`./buriedPointRecord/${fileName}.json`, JSON.stringify(buriedPointArr, null, 4));
}, 1000 * 5)