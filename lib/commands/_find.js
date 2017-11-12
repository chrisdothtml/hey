const { relative } = require('path')
const { resolveGlobs } = require('../_utils.js')

/*
  hey find '*.txt'
  hey find '*.txt' in some/dir
  hey find '*.txt' from some/dir
*/
module.exports = async function (command) {
  const { args, mods } = command
  const from = mods.in || mods.from
  let paths = await resolveGlobs(args, from)

  if (paths.length) {
    console.log(
      paths
        .map(path => relative(process.cwd(), path))
        .join('\n')
    )
  }
}
