const fs = require('fs')
const cloud_url = require('./cloud_url');
const config_url = require('./config_url');

const exportConfig = (appMenuStr) => {
   fs.writeFileSync(`../exportFile/CLOUD/CLOUD_NEW_URL-${new Date().toLocaleString()}.json`, appMenuStr)
}

let newCloudAPI = {};
for ( const key in cloud_url ) {
   newCloudAPI = {
      ...newCloudAPI,
      ...cloud_url[key]
   }  
}

let config = JSON.parse(JSON.stringify(config_url));
for (const ItemKey in config) {
   for( const key in config[ItemKey] ) {
      config[ItemKey][key] = newCloudAPI[key]
   }
}

console.log(config);
// let appMenuStr = JSON.stringify(appMenu);
// // console.log(111, nodeTranform, 222, appMenu);
// for (const item of nodeTranform) {
//    appMenuStr = appMenuStr.replace(new RegExp(`"${item.oldUrl}"`, 'g'), `"${item.newUrl}"`);
// }
// exportConfig(appMenuStr)
