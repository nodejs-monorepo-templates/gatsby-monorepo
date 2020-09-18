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
 * Move a dependency (if exist) from `[dependencies]` to `[peerDependencies]`
 * @param {PkgJson} pkgJson Target `package.json`
 * @param {string} name Name of target dependency
 */
function moveProdToPeer(pkgJson, name) {
  if (!pkgJson.dependencies) return false

  if (name in pkgJson.dependencies) {
    if (!pkgJson.peerDependencies) {
      pkgJson.peerDependencies = {}
    }
    pkgJson.peerDependencies[name] = pkgJson.dependencies[name]
    delete pkgJson.dependencies[name]
    return true
  }

  return false
}

/**
 * If a dependency named `name` exists in `pkg.dependencies`, move it to `pkg.peerDependencies` and log
 * @param {PkgJson} pkg Target package
 * @param {string} name Dependency name
 * @param {Ctx} ctx Context object
 */
function moveProdToPeerLog(pkg, name, ctx) {
  if (moveProdToPeer(pkg, name)) {
    ctx.log(`Made ${name} of ${pkg.name} a peer dependency`)
  }
}

/**
 * PNPM hook when package is read
 * @param {PkgJson} pkg Target package
 * @param {Ctx} ctx Context object
 */
function readPackage(pkg, ctx) {
  moveProdToPeerLog(pkg, '@types/react', ctx)
  return pkg
}

module.exports = {
  moveProdToPeer,
  moveProdToPeerLog,
  readPackage,
}
