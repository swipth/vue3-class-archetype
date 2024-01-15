const { notEmpty } = require('../utils.js')

module.exports = {
  description: '创建vuex',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: '请输入vuex名称,勿与之前重复,然后点击回车',
      validate: notEmpty('name'),
    },
  ],
  actions: () => {
    const name = '{{name}}'
    return [
      {
        type: 'add',
        path: `src/store/modules/${name}.js`,
        templateFile: 'node_modules/plop-templates-pharmablock/vuex/index.hbs',
      },
    ]
  },
}
