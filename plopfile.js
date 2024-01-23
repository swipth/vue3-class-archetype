const viewGenerator = require('plop-templates-pharmablock/views/prompt')
const curdGenerator = require('plop-templates-pharmablock/crud/prompt')
const apiGenerator = require('plop-templates-pharmablock/api/prompt')
const vuexGenerator = require('plop-templates-pharmablock/vuex/prompt')
const componentGenerator = require('plop-templates-pharmablock/components/prompt')
const mockGenerator = require('plop-templates-pharmablock/mock/prompt')

module.exports = (plop) => {
  plop.setHelper('upperCase', (string) => string.charAt(0).toUpperCase() + string.slice(1));

  plop.setGenerator('view', viewGenerator)
  plop.setGenerator('api', apiGenerator)
  plop.setGenerator('vuex', vuexGenerator)
  plop.setGenerator('crud', curdGenerator)
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('mock&api', mockGenerator)
}

