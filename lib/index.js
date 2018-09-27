const commands = require('./commands/index.js')
const parseCommand = require('./parse-command.js')
const { isArray, isString } = require('./_utils.js')

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
    if (commands[command.type]) {
      return commands[command.type](command)
    } else {
      throw new Error('invalid command')
    }
  } finally {
    process.chdir(origCwd)
  }
}

module.exports = hey
