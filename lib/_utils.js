const glob = require('glob')
const shell = require('shelljs')
const { promisify } = require('util')

exports.isArray = Array.isArray
exports.isString = thing => (typeof thing === 'string')

exports.doFrom = async function (path, task) {
  if (path) {
    const origCwd = process.cwd()

    shell.cd(path)
    await task()
    shell.cd(origCwd)
  } else {
    return task()
  }
}

exports.resolveGlobs = async function (paths) {
  let result = []

  await Promise.all(paths.map(async (path) => {
    if (glob.hasMagic(path)) {
      result = result.concat(
        await promisify(glob)(path)
      )
    } else {
      result = result.concat(path)
    }
  }))

  return result
}
