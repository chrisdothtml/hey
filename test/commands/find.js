const { expect } = require('chai')
const {
  createFixtures,
  removeFixtures,
  runWithFixture
} = require('./_utils.js')

const FIXTURES = {
  'find': ['foo.js']
}

describe('hey find', () => {
  before(() => {
    return createFixtures(FIXTURES)
  })

  after(() => {
    return removeFixtures(Object.keys(FIXTURES))
  })

  it('is an alias for `list`', async () => {
    const result = await runWithFixture('find', `hey find *.js`)

    expect(
      result.split('\n')
    ).to.have.members(FIXTURES.find)
  })
})
