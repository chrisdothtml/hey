const hey = require('../../lib/index.js')
const path = require('path')
const { expect } = require('chai')
const {
  createFixtures,
  FIXTURES_DIR,
  removeFixtures,
  runWithFixture,
  testFixture
} = require('./_utils.js')

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

  describe('via the node api', () => {
    before(() => {
      return createFixtures({
        'api': []
      })
    })

    after(() => {
      return removeFixtures(['api'])
    })

    it('parses a string into arguments', async () => {
      await hey('make foo.txt', { cwd: path.join(FIXTURES_DIR, 'api') })
      await testFixture('api', ['foo.txt'])
    })
  })
})
