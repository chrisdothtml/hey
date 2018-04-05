const chalk = require('chalk')
const fs = require('pfs')
const globby = require('globby')
const path = require('path')
const shell = require('shelljs')

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
    await fs.access(path)
  } catch (error) {
    if (error) result = false
  }

  return result
}

async function makeDir (dirPath, options = {}) {
  if (!options.silentFail && (await pathExists(dirPath))) {
    warn(`already exists: ${path.relative(process.cwd(), dirPath)}`)
  } else {
    shell.mkdir('-p', dirPath)
  }

  return dirPath
}

async function resolveGlobs (paths, cwd = process.cwd()) {
  let result = []

  await Promise.all(paths.map(async (path) => {
    const resolvedPaths = await globby(path, {
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
  makeDir,
  pathExists,
  resolveGlobs,
  warn
}
