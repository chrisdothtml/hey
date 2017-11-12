const trash = require('trash')
const { doFrom, resolveGlobs } = require('../_utils.js')

/*
  hey delete 'dir/*.txt'
  hey delete '*.txt' from dir
*/
module.exports = async function (command) {
  const { args, mods } = command

  return doFrom(mods.from, async () => {
    return trash(
      await resolveGlobs(args)
    )
  })
}
