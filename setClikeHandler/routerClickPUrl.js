const fs = require('fs');

const { typeName } = require('./clickConfig');
const { public, config, operation, pretreat, view } = require('./routerList.js');
const click_url = require('./click_url.json');
const buriedPoint_0916 = require('./buriedPointRecord/firstBuriedPoint_0916/buriedPoint_0916.js');

const routerList = [ ...public, ...config, ...operation, ...pretreat, ...view ];

const buriedPoinds = [];
const errorPoinds = [];
buriedPoint_0916.map((configItem) => {
    const { id, name, type, path } = configItem;
    const menuName = routerList.filter((item) => item.path === path)[0].name;
    if (!menuName) return errorPoinds.push(configItem);

    const url = Array.isArray(click_url[id]) ? click_url[id].join(';') : '';
    buriedPoinds.push({ menuName, path, id, name, typeName: typeName[type] || '其他', url })
})

// console.log(333, {errorPoinds});


fs.writeFileSync(`./buriedPointRecord/firstBuriedPoint_0916/buriedPoint_0917_2.json`, JSON.stringify(buriedPoinds, null, 4));