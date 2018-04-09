const { relative } = require('path')
const { resolveGlobs } = require('../_utils.js')

/*
  hey list '*.txt'
  hey list '*.txt' in some/dir
  hey list '*.txt' from some/dir
*/
module.exports = async function (command) {
  const { args, mods } = command
  let paths = await resolveGlobs(
    (args.length ? args : ['*']),
    (mods.in || mods.from)
  )

  if (paths.length) {
    console.log(
      paths
        .map(path => relative(process.cwd(), path))
        .join('\n')
    )
  }
}
