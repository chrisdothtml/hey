const {
  createFixtures,
  removeFixtures,
  runWithFixture,
  testFixture
} = require('./_utils.js')

describe('hey trash', () => {
  before(() => {
    return createFixtures({
      'trash': ['foo.txt', 'bar.js']
    })
  })

  after(() => {
    return removeFixtures(['trash'])
  })

  it('is an alias for `delete`', async () => {
    await runWithFixture('trash', 'hey trash *')
    await testFixture('trash', [])
  })
})
