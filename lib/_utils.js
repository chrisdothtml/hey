const chalk = require('chalk')
const fs = require('pfs')
const globby = require('globby')
const path = require('path')
const shell = require('shelljs')

function warn (text) {
  return console.log(chalk.yellow(text))
}

function isFile (filepath) {
  return path.basename(filepath).includes('.')
}

function isDirectory (filepath) {
  return !isFile(filepath)
}

function isString (thing) {
  return typeof thing === 'string'
}

function pathExists (filepath) {
  return fs.access(filepath)
    .then(() => true)
    .catch(() => false)
}

async function makeDir (dirPath, options = {}) {
  if (!options.silentFail && (await pathExists(dirPath))) {
    warn(`already exists: ${path.relative(process.cwd(), dirPath)}`)
  } else {
    shell.mkdir('-p', dirPath)
  }

  return dirPath
}

async function resolveGlobs (filepaths, cwd = process.cwd()) {
  let result = []

  await Promise.all(filepaths.map(async (filepath) => {
    const resolvedPaths = await globby(filepath, {
      absolute: true,
      cwd,
      dot: true
    })

    result = result.concat(resolvedPaths)
  }))

  return result.sort()
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
