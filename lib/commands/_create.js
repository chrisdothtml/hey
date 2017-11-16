const shell = require('shelljs')
const { normalize, parse, relative, resolve } = require('path')
const { isDirectory, pathExists, warn } = require('../_utils.js')

async function createPath (path) {
  const cwd = process.cwd()

  if (isDirectory(path)) {
    shell.mkdir('-p', path)
  } else {
    const { base, dir } = parse(path)

    if (!(await pathExists(dir))) {
      shell.mkdir('-p', dir)
    }

    shell.cd(dir)
    shell.touch(base)
    shell.cd(cwd)
  }

  return path
}

async function resolvePaths (command) {
  const { args, mods } = command
  const cwd = process.cwd()
  const from = normalize(mods.in || '')
  const paths = await Promise.all(
    args.map(async (arg) => {
      const resolvedPath = resolve(cwd, from, normalize(arg))
      let result

      if (await pathExists(resolvedPath)) {
        warn(`${command.type}: already exists: ${relative(cwd, resolvedPath)}`)
        result = false
      } else {
        result = resolvedPath
      }

      return result
    })
  )

  // remove paths that returned `false`
  return paths.filter(path => path)
}

/*
  hey create dir/file.txt
  hey create deep/dir/that/doesnt/exist
  hey create file.txt other-file.txt in dir
  hey create file.txt in dir/that/doesnt/exist
*/
module.exports = async function (command) {
  const paths = await resolvePaths(command)

  return Promise.all(paths.map(createPath))
}
