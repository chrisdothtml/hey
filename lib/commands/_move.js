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
  const { args, mods } = command
  const cwd = process.cwd()
  const paths = await resolveGlobs(args, (mods.from || mods.in))
  const destRootPath = path.join(cwd, (mods.into || mods.to || ''))

  return Promise.all(
    paths.map(async (filepath) => {
      const destPath = path.join(
        destRootPath,
        path.relative(cwd, filepath)
      )

      await fse.move(filepath, destPath)
    })
  )
}
