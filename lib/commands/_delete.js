const trash = require('trash')
const { resolveGlobs } = require('../utils.js')

/**
 * Move files/directories to trash
 *
 * @example
 * hey delete 'dir/*.txt'
 * hey delete '*.txt' from dir
 * hey delete '*.txt' in dir
*/
module.exports = async function (command) {
  const { args, mods } = command
  const paths = await resolveGlobs(args, (mods.from || mods.in))

  return trash(paths)
}
