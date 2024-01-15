const { notEmpty } = require('../utils.js')
module.exports = {
  description: '创建crud',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: '请输入view名称(可用/分隔,注意驼峰会被认定为多层目录进行拆分),勿与之前重复,然后点击回车',
      validate: notEmpty('name'),
    },
  ],
  actions: () => {
    const pathCaseName = '{{ pathCase name }}'
    const properCaseName = '{{ properCase name }}'
    const camelCaseName = '{{ camelCase name }}'
    return [
      {
        type: 'add',
        path: `src/views/${pathCaseName}/index.vue`,
        templateFile: 'node_modules/plop-templates-pharmablock/crud/index.hbs',
      },
      {
        type: 'add',
        path: `src/views/${pathCaseName}/components/${properCaseName}Edit.vue`,
        templateFile: 'node_modules/plop-templates-pharmablock/crud/edit.hbs',
      },
      {
        type: 'add',
        path: `mock/controller/${camelCaseName}.js`,
        templateFile: 'node_modules/plop-templates-pharmablock/mock/index.hbs',
      },
      {
        type: 'add',
        path: `src/api/${camelCaseName}.ts`,
        templateFile: 'node_modules/plop-templates-pharmablock/api/index.hbs',
      },
    ]
  },
}
