const {genApi}=require("plop-templates-pharmablock/gen/generate-api")
const {resolve} = require("path");

const apis = [
  {
    output: resolve(__dirname, '../src/api/modules'),
    url: 'http://172.16.18.160:8004/swagger/v1.0/swagger.json',
  },
]
genApi(apis)

