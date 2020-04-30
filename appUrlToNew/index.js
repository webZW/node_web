const fs = require('fs')
const nodeTranform = require('./nodeTranform');
const appMenu = require('./appMenu');

const exportConfig = (appMenuStr) => {
   fs.writeFileSync(`../exportFile/AppUrl/AppNewUrl-${new Date().toLocaleString()}.json`, appMenuStr)
}

let appMenuStr = JSON.stringify(appMenu);
// console.log(111, nodeTranform, 222, appMenu);
for (const item of nodeTranform) {
   appMenuStr = appMenuStr.replace(new RegExp(`"${item.oldUrl}"`, 'g'), `"${item.newUrl}"`);
}
exportConfig(appMenuStr)
