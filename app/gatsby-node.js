const path = require('path')
const fs = require('fs')
const places = require('@tools/places')

const packageNames = fs
  .readdirSync(places.packages)
  .map(name => path.join(places.packages, name, 'package.json'))
  .filter(filename => fs.existsSync(filename))
  .map(filename => require(filename).name)
const include = [
  __dirname,
  ...packageNames.map(name => path.join(__dirname, 'node_modules', name)),
]
const exclude = fs.readdirSync(path.join(__dirname, 'node_modules')) // <- TODO
  .filter(name => !packageNames.includes(name))
  .map(name => path.join(__dirname, 'node_modules', name))

exports.onCreateWebpackConfig = ({
  actions,
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              include,
              exclude,
            },
          },
        },
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              include,
              exclude,
            },
          },
        },
      ],
    },
  })
}
