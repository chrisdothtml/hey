const trash = require('trash')
const { doFrom } = require('../_utils.js')

module.exports = async function (command) {
  const { args, mods } = command

  return doFrom(mods.from, () => {
    return trash(args)
  })
}
