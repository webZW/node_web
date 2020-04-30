const fs = require('fs')
const AppNewUrl = require('../exportFile/AppUrl/AppNewUrl-2020-3-26 11:23:06');
const swaggerUrl = require('../exportFile/AppUrl/poit-app-2020-3-26 15:02:18');

for (const key in AppNewUrl) {
   AppNewUrl[key].url.map(item => {
      if (!swaggerUrl[item.path]) console.log('err-path:', item.path);

      item.name = `${AppNewUrl[key].name}-${swaggerUrl[item.path] ? swaggerUrl[item.path].name : 'null'}`
   })
}

const exportConfig = (AppNewUrl) => {
   fs.writeFileSync(`../exportFile/AppUrl/AppNewUrl_HasName-${new Date().toLocaleString()}.json`, AppNewUrl)
}

exportConfig(JSON.stringify(AppNewUrl))