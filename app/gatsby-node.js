const path = require('path')
const fs = require('fs')
const places = require('@tools/places')
const pkgJson = require('./package.json')

const packageNames = fs
  .readdirSync(places.packages)
  .map(name => path.join(places.packages, name, 'package.json'))
  .filter(filename => fs.existsSync(filename))
  .map(filename => require(filename).name)
const watchIgnored = Object.keys(pkgJson.dependencies)
  .filter(name => !packageNames.includes(name))
  .map(name => path.join('node_modules', name))

exports.onCreateWebpackConfig = ({
  actions,
}) => {
  actions.setWebpackConfig({
    watchOptions: {
      ignored: watchIgnored,
    },
  })
}
