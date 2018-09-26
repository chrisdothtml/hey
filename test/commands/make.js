const {
  createFixtures,
  removeFixtures,
  runWithFixture,
  testFixture
} = require('./_utils.js')

describe('hey make', () => {
  let fixtureNames

  before(async () => {
    fixtureNames = await createFixtures({
      'make': []
    })
  })

  after(() => {
    return removeFixtures(fixtureNames)
  })

  it('is an alias for `create`', async () => {
    await runWithFixture('make', 'hey make foo.txt')
    await testFixture('make', ['foo.txt'])
  })
})
