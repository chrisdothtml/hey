const chalk = require('chalk')
const fs = require('fs')
const glob = require('glob')
const { promisify } = require('util')

function isFile (path) {
  return ~path.indexOf('.')
}

function isDirectory (path) {
  return !isFile(path)
}

function isString (thing) {
  return typeof thing === 'string'
}

async function pathExists (path) {
  let result = true

  try {
    await promisify(fs.access)(path)
  } catch (error) {
    if (error) result = false
  }

  return result
}

async function resolveGlobs (paths, cwd = process.cwd()) {
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

function warn (text) {
  return console.log(chalk.yellow(text))
}

module.exports = {
  isArray: Array.isArray,
  isDirectory,
  isFile,
  isString,
  pathExists,
  resolveGlobs,
  warn
}
