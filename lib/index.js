const parseCommand = require('./parse-command.js')
const { isArray, isString } = require('./utils.js')

const COMMANDS = [
  'create',
  'delete',
  'destroy',
  'find',
  'list',
  'make',
  'move',
  'remove',
  'trash',
  'where'
].reduce((result, key) => {
  result[key] = require(`./commands/${key}.js`)
  return result
}, {})

async function hey (input, options = {}) {
  const origCwd = process.cwd()

  if (options.cwd) {
    process.chdir(options.cwd)
  }

  if (!isArray(input)) {
    if (isString(input)) {
      input = input.trim().split(/\s+/)
    } else {
      throw new Error('invalid input')
    }
  }

  const command = parseCommand(input)

  try {
    if (COMMANDS[command.type]) {
      return COMMANDS[command.type](command)
    } else {
      throw new Error('invalid command')
    }
  } finally {
    process.chdir(origCwd)
  }
}

module.exports = hey
