const {
  createFixtures,
  removeFixtures,
  runWithFixture,
  testFixture
} = require('./_utils.js')

describe('hey destroy', () => {
  before(() => {
    return createFixtures({
      'destroy': ['foo.txt', 'bar.js']
    })
  })

  after(() => {
    return removeFixtures(['destroy'])
  })

  it('is an alias for `remove`', async () => {
    await runWithFixture('destroy', 'hey destroy *')
    await testFixture('destroy', [])
  })
})
