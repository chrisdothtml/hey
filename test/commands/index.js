const hey = require('../../lib/index.js')
const { expect } = require('chai')
const { runWithFixture } = require('./_utils.js')

// TODO: add test to cover using a command via node api

describe('hey', () => {
  it('throws an error for invalid input', async () => {
    let result = ''

    try {
      await hey({})
    } catch (error) { result = error.message }

    expect(result).to.contain('invalid input')
  })

  it('throws an error for invalid commands', async () => {
    const result = await runWithFixture('', 'hey invalid')
    expect(result).to.contain('invalid command')
  })
})
