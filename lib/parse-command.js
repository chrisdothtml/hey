const MODIFIERS = ['from', 'in', 'into', 'to']

module.exports = function parseCommand (args) {
  const result = {
    args: [],
    mods: {},
    type: args[0]
  }

  args.slice(1)
    .forEach((arg, i, args) => {
      if (arg) {
        if (MODIFIERS.includes(arg)) {
          result.mods[arg] = args[i + 1]
          args[i + 1] = false
        } else {
          result.args.push(arg)
        }
      }
    })

  return result
}
