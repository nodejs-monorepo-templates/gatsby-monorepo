const appPkgJson = require('./package.json')

/**
 * Interface of `package.json`
 * @typedef PkgJson
 * @property {string | undefined} name
 * @property {Record<string, string> | undefined} dependencies
 * @property {Record<string, string> | undefined} devDependencies
 * @property {Record<string, string> | undefined} peerDependencies
 */

/**
 * Interface of context object
 * @typedef Ctx
 * @property {(msg: string) => void} log Log message
 */

/**
 * Set dependency version
 * @param {PkgJson} pkgJson Target `package.json`
 * @param {string} name Name of target dependency
 * @param {string} version Intended version of target dependency
 */
function setDependencyVersion(pkgJson, name, version) {
  if (!pkgJson.dependencies) {
    pkgJson.dependencies = {}
  }

  if (name in pkgJson.dependencies) {
    pkgJson.dependencies[name] = version
    return true
  }

  return false
}

/**
 * PNPM hook when package is read
 * @param {PkgJson} pkg Target package
 * @param {Ctx} ctx Context object
 */
function readPackage(pkg, ctx) {
  if (setDependencyVersion(pkg, '@types/react', appPkgJson.peerDependencies['@types/react'])) {
    ctx.log(`Corrected @types/react of ${pkg.name}`)
  }
  return pkg
}

exports.hooks = {
  readPackage,
}
