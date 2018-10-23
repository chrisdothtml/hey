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

function isString (input) {
  return typeof thing === 'string'
}

function kebabToCamel (input) {
  return input
    .split('-')
    .reduce((result, section, i) => {
      if (i > 0) {
        section = section.charAt(0).toUpperCase() + section.slice(1)
      }

      return result + section
    }, '')
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

async function resolveDupeWritePath (filepath) {
  if (await pathExists(filepath)) {
    let { name, dir, ext } = path.parse(filepath)
    let [ , copyNum ] = name.match(/\((\d+)\)$/) || []

    if (copyNum) {
      copyNum = parseInt(copyNum)
      name = name.replace(/\(\d+\)$/, `(${copyNum + 1})`)
    } else {
      name += ' (1)'
    }

    filepath = await resolveDupeWritePath(path.join(dir, name + ext))
  }

  return filepath
}

module.exports = {
  isArray: Array.isArray,
  isDirectory,
  isFile,
  isString,
  kebabToCamel,
  pathExists,
  removeNonEmptyDirs,
  resolveDupeWritePath,
  resolveGlobs,
  warn
}
