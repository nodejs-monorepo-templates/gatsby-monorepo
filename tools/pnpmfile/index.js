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
 * @param {string | (name: string) => boolean} pattern Name or pattern of target dependency
 */
function* moveProdToPeer(pkgJson, pattern) {
  if (!pkgJson.dependencies) return

  /**
   * @param {string} name
   */
  function act(name) {
    if (!pkgJson.peerDependencies) {
      pkgJson.peerDependencies = {}
    }
    pkgJson.peerDependencies[name] = pkgJson.dependencies[name]
    delete pkgJson.dependencies[name]
  }

  switch (typeof pattern) {
    case 'string':
      if (pattern in pkgJson.dependencies) {
        act(pattern)
        yield pattern
      }
      return

    case 'function':
      for (const name in pkgJson.dependencies) {
        if (pattern(name)) {
          act(pattern)
          yield name
        }
      }
      return
  }
}

/**
 * If a dependency named `name` exists in `pkg.dependencies`, move it to `pkg.peerDependencies` and log
 * @param {PkgJson} pkg Target package
 * @param {string | (name: string) => boolean} pattern Dependency name
 * @param {Ctx} ctx Context object
 */
function moveProdToPeerLog(pkg, pattern, ctx) {
  for (const name of moveProdToPeer(pkg, pattern)) {
    ctx.log(`Made ${name} of ${pkg.name} a peer dependency`)
  }
}

/**
 * PNPM hook when package is read
 * @param {PkgJson} pkg Target package
 * @param {Ctx} ctx Context object
 */
function readPackage(pkg, ctx) {
  moveProdToPeerLog(pkg, 'react', ctx)
  moveProdToPeerLog(pkg, 'react-dom', ctx)
  moveProdToPeerLog(pkg, '@types/react', ctx)
  return pkg
}

module.exports = {
  moveProdToPeer,
  moveProdToPeerLog,
  readPackage,
}
