const { override, addLessLoader } = require('customize-cra')

module.exports = override(
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { '@base-color': '#E13641' }
    }
  })
)
