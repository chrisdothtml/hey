const {
  createFixtures,
  removeFixtures,
  runWithFixture,
  testFixture
} = require('./_utils.js')

describe('hey delete', () => {
  before(() => {
    return createFixtures({
      'delete': ['one.txt', 'two.js'],
      'deleteFrom': ['subDir/one.txt', 'subDir/two.js']
    })
  })

  after(() => {
    return removeFixtures(['delete', 'deleteFrom'])
  })

  it('deletes the provided files', async () => {
    await runWithFixture('delete', `hey delete *`)
    await testFixture('delete', [])
  })

  it('deletes the provided files from the provided directory', async () => {
    await runWithFixture('deleteFrom', `hey delete * from subDir`)
    await testFixture('deleteFrom', ['subDir'])
  })
})
