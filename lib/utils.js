const kleur = require('kleur')
const fse = require('fs-extra')
const globby = require('globby')
const path = require('path')

function warn (text) {
  return console.log(kleur.yellow(text))
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
  return fse.access(filepath)
    .then(() => true)
    .catch(() => false)
}

/*
 * Used with Array.filter; Filters out directories that have
 * files in them (i.e. only includes directories in array if
 * there's not also files from that dir in the array)
 */
function removeNonEmptyDirs (filepath, i, filepaths) {
  let dirAlreadyRepresented = false

  if (isDirectory(filepath)) {
    dirAlreadyRepresented = filepaths.some(otherFilepath => {
      return filepath === path.dirname(otherFilepath)
    })
  }

  return !dirAlreadyRepresented
}

async function resolveGlobs (filepaths, cwd = process.cwd()) {
  let result = []

  await Promise.all(filepaths.map(async (filepath) => {
    const resolvedPaths = await globby(filepath, {
      absolute: true,
      cwd,
      dot: true,
      onlyFiles: false
    })

    result = result.concat(resolvedPaths)
  }))

  return result
    .filter(removeNonEmptyDirs)
    .sort()
}

module.exports = {
  isArray: Array.isArray,
  isDirectory,
  isFile,
  isString,
  pathExists,
  removeNonEmptyDirs,
  resolveGlobs,
  warn
}