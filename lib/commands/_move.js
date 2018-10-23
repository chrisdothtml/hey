const fse = require('fs-extra')
const path = require('path')
const { resolveGlobs } = require('../utils.js')

/**
 * Move files/directories. Use `--flat` to flatten
 * directory structure
 *
 * @example
 * hey move '*.txt' into some/dir
 * hey move '*.txt' to some/dir
 * hey move '*.txt' from dir into other/dir
 * hey move '*.txt' in dir to other/dir
 * hey move '**\/*.png' into assets/img --flat
*/
module.exports = async function (command) {
  const { args, flags, mods } = command
  const cwd = process.cwd()
  const parentDir = mods.from || mods.in || cwd
  const paths = await resolveGlobs(args, parentDir)
  const destRootPath = path.join(cwd, (mods.into || mods.to || ''))

  return Promise.all(
    paths.map(async (filepath) => {
      let destPath

      if (flags.flat) {
        destPath = path.join(
          destRootPath,
          path.basename(filepath)
        )
      } else {
        destPath = path.join(
          destRootPath,
          path.relative(parentDir, filepath)
        )
      }

      await fse.move(filepath, destPath)
    })
  )
}
