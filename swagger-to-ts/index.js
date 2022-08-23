const fs = require('fs')
const { fetchUrl } = require('fetch');
const swaggerToTS = require("@manifoldco/swagger-to-ts");

const fetchFun = async (callback) => {
    await fetchUrl('http://192.168.100.31/poit-cloud-platform/v2/api-docs', callback);
 }

fetchFun((error, meta, body) => {
    const input = JSON.parse(body); // Input can be any JS object (OpenAPI format)
    const output = swaggerToTS.default(input); // Outputs TypeScript defs as a string (to be parsed, or written to a file)
    
    const data = output.replace(/definitions/g, 'cloudPlatformTypes');
    exportHandler(data);
});

const exportHandler = (data) => {
    fs.writeFileSync(`./exportFile/poit-cloud-platform.d.ts`,  data)
 }
 