const { kebabToCamel } = require('./utils.js')

const MODIFIERS = ['from', 'in', 'into', 'to']
const FLAG_REGEX = /^--[^-]+/

module.exports = function parseCommand (args) {
  const result = {
    args: [],
    flags: {},
    mods: {},
    type: args[0]
  }

  args.slice(1)
    .forEach((arg, i, args) => {
      if (arg) {
        if (FLAG_REGEX.test(arg)) {
          let [ key, value ] = arg.slice(2).split('=')

          key = kebabToCamel(key)
          result.flags[key] = value || true
        } else if (MODIFIERS.includes(arg)) {
          result.mods[arg] = args[i + 1]
          args[i + 1] = false
        } else {
          result.args.push(arg)
        }
      }
    })

  return result
}
