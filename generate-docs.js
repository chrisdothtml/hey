const doctrine = require('doctrine')
const fse = require('fs-extra')
const path = require('path')
const DOCS_FILEPATH = path.join(__dirname, 'commands.md')
const COMMANDS_DIR = path.resolve(__dirname, 'lib/commands')

async function getCommands () {
  return Promise.all(
    (await fse.readdir(COMMANDS_DIR))
      .filter(filename => filename.charAt(0) === '_')
      .sort()
      .map(async (filename) => {
        const commandName = filename.slice(1, -3)
        const filepath = path.join(COMMANDS_DIR, filename)
        const content = await fse.readFile(filepath, 'utf-8')
        const jsdoc = doctrine.parse(
          // find jsdoc comment
          (content.match(/\/\*\*(?!\*\/)(.|\n)+\*\//) || [''])[0],
          { unwrap: true }
        )
        const command = { name: commandName }

        if (jsdoc.description) {
          command.description = jsdoc.description.replace(/\n/g, ' ')
        }

        for (const tag of jsdoc.tags) {
          if (tag.title === 'alias') {
            command.alias = tag.name
          } else if (tag.title === 'example') {
            command.example = tag.description
          }
        }

        return command
      })
  )
}

// e.g. '#command' -> '[command](#command)'
function hashToMDLink (hashString) {
  return `[${hashString.slice(1)}](${hashString})`
}

// for using template strings within indented code
function trimLines (input) {
  return input.split('\n').map(line => line.trim()).join('\n')
}

function render (commands) {
  /* eslint-disable indent */
  return trimLines(`# Commands

    ${commands
      // table of contents
      .map(command => `- ${hashToMDLink('#' + command.name)}`)
      .join('\n')}

    ${commands
      // command docs
      .map(command => {
        let { alias, description, example, name } = command
        let output = `### ${name}`

        if (alias) {
          description = `Alias for #${alias}`
        }

        if (description) {
          output += `\n\n`
          output += description.replace(/#\w+/g, hashToMDLink)
        }

        if (example) {
          example = example.replace(/\*\\\//g, '*/')

          output += '\n\n```bash\n'
          output += example
            .split('\n')
            .map(line => `$ ${line}`)
            .join('\n')
          output += '\n```'
        }

        return output
      })
      .join('\n\n')}
  `)
}

;(async () => {
  const commands = await getCommands()
  const markdown = render(commands)

  await fse.writeFile(DOCS_FILEPATH, markdown, 'utf-8')
})().catch(console.error)
