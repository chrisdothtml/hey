const fse = require('fs-extra')
const path = require('path')
const { isDirectory, pathExists, warn } = require('../utils.js')

async function createPath (filepath) {
  if (await pathExists(filepath)) {
    warn(`already exists: ${path.relative(process.cwd(), filepath)}`)
  } else {
    if (isDirectory(filepath)) {
      await fse.ensureDir(filepath)
    } else {
      const { dir } = path.parse(filepath)

      await fse.ensureDir(dir)
      await fse.writeFile(filepath, '', 'utf-8')
    }
  }

  return filepath
}

function resolvePaths (command) {
  const { args, mods } = command
  const cwd = process.cwd()
  const from = path.normalize(mods.in || '')

  return args.map(arg => {
    return path.resolve(cwd, from, path.normalize(arg))
  })
}

/**
 * Create new files/directories
 *
 * @example
 * hey create dir/file.txt
 * hey create deep/dir/that/doesnt/exist
 * hey create file.txt other-file.txt in dir
 * hey create file.txt in dir/that/doesnt/exist
*/
module.exports = async function (command) {
  const paths = resolvePaths(command)

  return Promise.all(paths.map(createPath))
}
