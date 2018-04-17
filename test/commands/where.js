const path = require('path')
const { expect } = require('chai')
const {
  FIXTURES_DIR,
  createFixtures,
  removeFixtures,
  runWithFixture
} = require('./_utils.js')

describe('hey where', () => {
  before(() => {
    return createFixtures({ 'where': [] })
  })

  after(() => {
    return removeFixtures(['where'])
  })

  it('outputs the cwd', async () => {
    const result = await runWithFixture('where', `hey where am I`)
    expect(result).to.equal(path.join(FIXTURES_DIR, 'where'))
  })
})
