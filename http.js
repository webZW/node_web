/**
 * http axios 配置
 * HZW 20200321
 */
const axios = require('axios');
const Qs = require('qs');
// axios 配置
axios.defaults.timeout = 60 * 1000;
axios.defaults.paramsSerializer = (params) => {
   return Qs.stringify(params, { arrayFormat: 'indices' });
};
// http request 拦截器，请求时拦截
axios.interceptors.request.use(async (config) => {
   config.headers.poit_cloud_src_client = 'poit-management';
   config.headers.Authorization = 'VE9LRU5fUE9JVF8yMDE5XzIwMjAtNTAwOTA2LTE1ODY3NTc4MjkzNzYtWE5HMjNFOHpvZXBjQ2hKNGF2VmVrZ1BJVnA5MmZUUjBpSTBSejhwcVV2QlV3';
   return config;
}, (err) => {
   return Promise.reject(err);
});
// http response 拦截器
axios.interceptors.response.use((response) => {
   // console.log('http response 拦截器：', response, common)
   if (response.data.retCode === '010001') {
      //   Message.warning(`请求失败-${response.data.retMsg}`);
      // token失效或无效，返回登录界面
      // logout();
   }
   else {
      return response;
   }
}, (error) => {
   if (error instanceof Error) {
      switch (error.message) {
         case 'Network Error':
            error.message = '网络错误，请稍后再试';
            break;
         case 'timeout of 60000ms exceeded':
            error.message = '请求超时，请重新请求';
            break;
      }
      //   Message.error(error.message);
      return Promise.reject(error.message);
   }
   if (error.response) {
      switch (error.response.status) {
         case 401:
      }
   }
   return Promise.reject(error.response);
});
// 返回data信息
function checkStatus(response) {
   // loading
   // 如果http状态码正常，则直接返回数据
   if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
      return response.data;
      // 如果不需要除了data之外的数据，可以直接 return response.data
   }
   // 异常状态下，把错误信息返回去
   return {
      retCode: '-404',
      retMsg: '网络异常',
   };
}
function checkCode(res) {
   // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
   if (!res) {
      return;
   }
   if (res.status === -404) {
      console.log(res.msg);
   }
   if (res.data && (res.data.retCode !== '0')) {
      console.log(res.data.retMsg);
   }
   return res;
}
// 检查返回API是否为当前页面API
function checkResponse(response) {
   checkCode(response);
   try {
      return checkStatus(response);
   }
   catch (err) {
      console.log('Callback Error:' + err);
   }
}
const GET = 'get';
const POST = 'post';
//这三个是用于setParams做区分的
const BODY_TYPE_JSON_STRINGIFY = 'JSON_STRINGIFY';
const BODY_TYPE_JSON = 'JSON';
const BODY_TYPE_FORM_DATA = 'FORM_DATA';
const ContentTypeConfig = {
   [BODY_TYPE_JSON_STRINGIFY]: 'application/x-www-form-urlencoded; charset=UTF-8',
   [BODY_TYPE_JSON]: 'application/json; charset=UTF-8',
   [BODY_TYPE_FORM_DATA]: 'multipart/form-data'
};
const typeConfig = {
   export: { responseType: "arraybuffer" }
};
// e.g => etRequest(api.GET_PASSWARD, { params })
const getRequest = (url, option = {}) => {
   return request({ method: GET, url, option });
};
// e.g => postRequest(api.GET_PASSWARD, { params, bodyType: BODY_TYPE_JSON_STRINGIFY });
const postRequest = (url, options = { params: {} }) => {
   return request({ method: POST, url, option: Object.assign(Object.assign({}, options), { bodyType: options.bodyType || BODY_TYPE_JSON }) });
};
// client: 客户端（cloud-连接应用平台、service-数据服务平台、region-区域平台）
const request = ({ method, url, option = {} }) => {
   // 参数转换
   const { client = 'region' } = option;
   const bodyType = option.bodyType || BODY_TYPE_JSON_STRINGIFY;
   const headers = { 'X-Requested-With': 'XMLHttpRequest', 'poit_cloud_src_client': client, 'Content-Type': ContentTypeConfig[bodyType] };
   const data = setParams({ method, option, bodyType, client });
   return new Promise((resolve, reject) => {
      Promise.race([
         timeoutRequest(),
         axios(Object.assign({ url, method, headers }, data)),
      ]).then((response) => {
         resolve(checkResponse(response));
      }).catch(error => {
         console.log(error);
         reject({ retCode: 404, retMsg: error + '' });
      });
      ;
   });
};
const setParams = ({ method, option, bodyType, client }) => {
   let data = {};
   params = option.params;
   if (method === GET) {
      data.params = params;
   }
   else {
      data.data = bodyType === BODY_TYPE_JSON_STRINGIFY ? Qs.stringify(params) : params;
   }
   // 配置 axios 额外参数，如：导出报表，配置接口返回类型： responseType: "arraybuffer";
   option.type && (data = Object.assign(Object.assign({}, data), typeConfig[option.type]));
   return data;
};
const TIMEOUT = 60 * 1000;
const timeoutRequest = () => {
   return new Promise(resolve => {
      setTimeout(() => {
         const data = {
            retCode: '-1',
            retMsg: '网络超时',
         };
         resolve(data);
      }, TIMEOUT);
   });
};

module.exports = { BODY_TYPE_JSON_STRINGIFY, BODY_TYPE_JSON, BODY_TYPE_FORM_DATA, getRequest, postRequest }
