const { generateApi } = require('swagger-typescript-api')
const path = require('path')
// const fs = require('fs')

const apis = [
  {
    output: path.resolve(__dirname, '../src/api/modules'),
    url: 'http://172.16.18.160:8004/swagger/v1.0/swagger.json',
  },
]

apis?.forEach((api, index) => {
  setTimeout(() => {
    generateApi({
      output: api.output,
      // templates: path.resolve(__dirname, './templates'),
      templates: path.resolve(__dirname, '../node_modules/plop-templates-pharmablock/templates'),
      url: api.url,
      httpClientType: 'axios',
      modular: true,
      cleanOutput: true,
      moduleNameIndex: 2, // 0 api, 1 api htt-client data-contracts, 2 apis htt-client data-contracts
      moduleNameFirstTag: true, //apis htt-client data-contracts
      unwrapResponseData: true,
      generateUnionEnums: true,
      defaultResponseType: 'AxiosResponse',
      // hooks: {
      //   onFormatTypeName: (typeName, rawTypeName, schemaType) => {
      //   },
      // }
    })
      .then(() => {
        // files.forEach(({ content, name }) => {
        //   fs.writeFile(path, content);
        // });
      })
      .catch((e) => console.error(e))
  }, index * 1500)
})
