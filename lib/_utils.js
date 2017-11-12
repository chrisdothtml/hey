const glob = require('glob')
const { promisify } = require('util')

exports.isArray = Array.isArray
exports.isString = thing => (typeof thing === 'string')

exports.resolveGlobs = async function (paths, cwd = process.cwd()) {
  let result = []

  await Promise.all(paths.map(async (path) => {
    const resolvedPaths = await promisify(glob)(path, {
      absolute: true,
      cwd,
      dot: true
    })

    result = result.concat(resolvedPaths)
  }))

  return result.sort()
}
