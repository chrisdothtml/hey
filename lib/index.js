const commands = require('./commands/index.js')
const parseCommand = require('./parse-command.js')
const { isArray, isString } = require('./_utils.js')

async function hey (input) {
  if (!isArray(input)) {
    if (isString(input)) {
      input = input.trim().split(/\s+/)
    } else {
      throw new Error('invalid input')
    }
  }

  const command = parseCommand(input)

  if (commands[command.type]) {
    return commands[command.type](command)
  }
}

module.exports = hey
