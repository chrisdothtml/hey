import parseCommand from '../lib/parse-command.js'
import test from 'ava'

function testCommand (t, input, expected) {
  t.deepEqual(
    parseCommand(input.split(' ')),
    expected
  )
}

test('extracts the command type, args, and modifiers', (t) => {
  testCommand(t, 'remove file.txt *.js', {
    args: ['file.txt', '*.js'],
    flags: {},
    mods: {},
    type: 'remove'
  })

  testCommand(t, 'move file.txt from dir to other/dir', {
    args: ['file.txt'],
    flags: {},
    mods: {
      from: 'dir',
      to: 'other/dir'
    },
    type: 'move'
  })

  testCommand(t, 'copy *.js from dir into other/dir --bool-flag --format=flat', {
    args: ['*.js'],
    flags: {
      boolFlag: true,
      format: 'flat'
    },
    mods: {
      from: 'dir',
      into: 'other/dir'
    },
    type: 'copy'
  })
})
