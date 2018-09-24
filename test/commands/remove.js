const {
  createFixtures,
  removeFixtures,
  runWithFixture,
  testFixture
} = require('./_utils.js')

describe('hey remove', () => {
  before(() => {
    return createFixtures({
      'remove': ['foo.txt', 'bar.js'],
      'removeFrom': ['subDir/foo.txt', 'subDir/bar.js']
    })
  })

  after(() => {
    return removeFixtures(['remove', 'removeFrom'])
  })

  it('removes the provided files', async () => {
    await runWithFixture('remove', 'hey remove *')
    await testFixture('remove', [])
  })

  it('removes the provided files from the provided directory', async () => {
    await runWithFixture('removeFrom', 'hey remove * from subDir')
    await testFixture('removeFrom', ['subDir'])
  })
})
