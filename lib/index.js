const { isArray, isString } = require('./_utils.js')

const COMMANDS = ['delete']
const KEYWORDS = ['from', 'to']
const HOOK_KEYWORD = 'and'

function parseRequest (args) {
  const result = {}
  const hooks = []
  let inHook = false
  let currentHook = 0

  // hooks
  args = args.map(arg => {
    let shouldConsume = false

    if (arg === HOOK_KEYWORD) {
      if (inHook) {
        currentHook++
      } else {
        inHook = true
      }

      shouldConsume = true
    } else if (inHook) {
      if (!hooks[currentHook]) hooks[currentHook] = []
      hooks[currentHook].push(arg)
      shouldConsume = true
    }

    if (shouldConsume) return false
    else return arg
  }).filter(arg => arg !== false)

  return {
    args,
    hooks
  }
}

function hey (input) {
  if (!isArray(input)) {
    if (isString(input)) {
      input = input.trim().split(/\s+/)
    } else {
      // throw type error
    }
  }

  console.log(
    parseRequest(input)
  )
}

module.exports = hey
