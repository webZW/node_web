const { postRequest } = require('../http');
const manageUrl = require('../exportFile/AppUrl/manageUrl.json')
console.log(111, postRequest);

const postFun = async ({ params }) => {

  const { retMsg, retCode, ...data } = await postRequest('http://192.168.100.44:30010/resource/sub/operation', { params });
  console.log(1234, { retMsg, retCode, ...data })
}

for (const key in manageUrl) {
   postFun({ params: manageUrl[key] });
}
