const shell = require('shelljs')

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
