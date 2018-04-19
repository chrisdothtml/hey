const {
  createFixtures,
  removeFixtures,
  runWithFixture,
  testFixture
} = require('./_utils.js')

describe('hey make', () => {
  before(() => {
    return createFixtures({
      'make': []
    })
  })

  after(() => {
    return removeFixtures(['make'])
  })

  it('is an alias for `create`', async () => {
    await runWithFixture('make', `hey make foo.txt`)
    await testFixture('make', ['foo.txt'])
  })
})
