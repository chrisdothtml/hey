const {
  createFixtures,
  removeFixtures,
  runWithFixture,
  testFixture
} = require('./_utils.js')

describe('hey delete', () => {
  before(() => {
    return createFixtures({
      'delete': ['foo.txt', 'bar.js'],
      'deleteFrom': ['subDir/foo.txt', 'subDir/bar.js']
    })
  })

  after(() => {
    return removeFixtures(['delete', 'deleteFrom'])
  })

  it('deletes the provided files', async () => {
    await runWithFixture('delete', 'hey delete *')
    await testFixture('delete', [])
  })

  it('deletes the provided files from the provided directory', async () => {
    await runWithFixture('deleteFrom', 'hey delete * from subDir')
    await testFixture('deleteFrom', ['subDir'])
  })
})
