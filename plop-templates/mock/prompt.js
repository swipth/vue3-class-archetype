const { notEmpty } = require('../utils.js')

module.exports = {
  description: '创建mock&api',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: '请输入mock名称,勿与之前重复,然后点击回车',
      validate: notEmpty('name'),
    },
  ],
  actions: () => {
    const name = '{{name}}'
    return [
      {
        type: 'add',
        path: `mock/controller/${name}.js`,
        templateFile: 'node_modules/plop-templates-pharmablock/mock/index.hbs',
      },
      {
        type: 'add',
        path: `src/api/${name}.js`,
        templateFile: 'node_modules/plop-templates-pharmablock/api/index.hbs',
      },
    ]
  },
}
