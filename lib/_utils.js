const glob = require('glob')
const shell = require('shelljs')
const { promisify } = require('util')

exports.isArray = Array.isArray
exports.isString = thing => (typeof thing === 'string')

exports.doFrom = async function (path, task) {
  let result

  if (path) {
    const origCwd = process.cwd()

    shell.cd(path)
    result = await task()
    shell.cd(origCwd)
  } else {
    result = await task()
  }

  return result
}

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
