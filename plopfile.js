const viewGenerator = require('plop-templates/views/prompt')
const curdGenerator = require('plop-templates/crud/prompt')
const componentGenerator = require('plop-templates/components/prompt')
const mockGenerator = require('plop-templates/mock/prompt')

module.exports = (plop) => {
  plop.setGenerator('view', viewGenerator)
  plop.setGenerator('crud', curdGenerator)
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('mock&api', mockGenerator)
}
