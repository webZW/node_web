const { generateApi } = require('swagger-typescript-api');
const path = require('path');
const outputDir = path.resolve(process.cwd(), './src/__generated__');

/* NOTE: all fields are optional expect one of `output`, `url`, `spec` */
generateApi({
  // input: path.resolve(__dirname, "./schemas.json"),
  url: 'http://192.168.100.31/poit-cloud-platform/v2/api-docs',
  output: outputDir,
  modular: true,
  templates: path.resolve(__dirname, './templates'),
  axios: true,
  routeTypes: true,
});