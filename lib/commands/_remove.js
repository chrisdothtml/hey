const fse = require('fs-extra')
const { resolveGlobs } = require('../_utils.js')

/*
  hey remove 'dir/*.txt'
  hey remove '*.txt' from dir
  hey remove '*.txt' in dir
*/
module.exports = async function (command) {
  const { args, mods } = command
  const paths = await resolveGlobs(args, (mods.from || mods.in))

  return Promise.all(
    paths.map(filepath => fse.remove(filepath))
  )
}
