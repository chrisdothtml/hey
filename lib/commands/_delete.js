const trash = require('trash')
const { doFrom, resolveGlobs } = require('../_utils.js')

module.exports = async function (command) {
  const { args, mods } = command

  return doFrom(mods.from, async () => {
    return trash(
      await resolveGlobs(args)
    )
  })
}
