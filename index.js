const { fetchUrl } = require('fetch');
const fs = require('fs')
const postConfig = require('./CLOUD_POST_CONFIG.json')

const fetchFun = async (callback) => {
   await fetchUrl('http://192.168.100.31/poit-cloud-platform/v2/api-docs', callback);
}

fetchFun((error, meta, body) => {
   const res = JSON.parse(body.toString()).paths;
   makeUrlConfig(res);
});

const newPostConfig = {};
for (const key in postConfig) {
   postConfig[key].map( item => {
      newPostConfig[item] = key;
   } )
}
console.log('newPostConfig: ', newPostConfig);

const fetchTypeConfig = {
   get: () => 'GET',
   post: (url) => newPostConfig[url] ?  newPostConfig[url] : 'POST',
}

const makeUrlConfig = (res) => {
   let urlConfig = {};
   for (let key in res) {
      const type = res[key].post ? 'post' : 'get';

      if (!urlConfig[type]) urlConfig[type] = {};
      if (!Array.isArray(urlConfig[`${type}_message`])) urlConfig[`${type}_message`] = [];

      const url = key.replace(/^\/(.*)$/g, '$1')
      const fetchType = fetchTypeConfig[type](url);

      urlConfig[type][url] = {
         type,
         fetchType,
         name: res[key][type].summary
      }
      urlConfig[`${type}_message`].push({
         name: res[key][type].summary,
         path: key
      });
   }

   exportConfig(urlConfig);
}

const exportConfig = (urlConfig) => {
   fs.writeFileSync(`./exportFile/poit-serving-platform-${new Date().toLocaleString()}.json`, JSON.stringify(urlConfig))
}

