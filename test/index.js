/* eslint-env mocha */

const parseCommand = require('../lib/methods/parse-command.js')
const { expect } = require('chai')

describe('parseCommand', () => {
  it('extracts the command type, args, and modifiers', () => {
    const input = 'copy file.txt *.js from ../dir into dir/thing to new-dir'
    const parsed = parseCommand(input.split(' '))
    const expected = {
      args: ['file.txt', '*.js'],
      mods: {
        from: '../dir',
        into: 'dir/thing',
        to: 'new-dir'
      },
      type: 'copy'
    }

    expect(parsed).to.deep.equal(expected)
  })
})
