const { fetchUrl } = require('fetch');
const fs = require('fs')
let openApiTS = null;

const fetchFun = async (callback) => {
    openApiTS = await import('openapi-typescript');
    await fetchUrl('http://192.168.100.31/poit-cloud-platform/v2/api-docs', callback);
 }

fetchFun((error, meta, body) => {
    swaggerToTs(body);
 });
 
// example 1: load [object] as schema (JSON only)
const swaggerToTs = async (body) => {
    console.log(34445, {body: JSON.parse(body)});
    const output = await openApiTS.default(JSON.parse(body.toString('utf8')));
    console.log({output});
}

// // example 2: load [string] as local file (YAML or JSON; released in v4.0)
// const localPath = new URL("./spec.yaml", import.meta.url); // may be YAML or JSON format
// const output = await openapiTS(localPath);

// // example 3: load [string] as remote URL (YAML or JSON; released in v4.0)
// const output = await openapiTS("https://myurl.com/v1/openapi.yaml");