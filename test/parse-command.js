import parseCommand from '../lib/parse-command.js'
import test from 'ava'

test('extracts the command type, args, and modifiers', (t) => {
  const input = 'copy file.txt *.js in some-dir from ../dir into dir/thing to new-dir'
  const parsed = parseCommand(input.split(' '))
  const expected = {
    args: ['file.txt', '*.js'],
    mods: {
      from: '../dir',
      in: 'some-dir',
      into: 'dir/thing',
      to: 'new-dir'
    },
    type: 'copy'
  }

  t.deepEqual(parsed, expected)
})
