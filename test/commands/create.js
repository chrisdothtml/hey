const {
  createFixtures,
  removeFixtures,
  runWithFixture,
  testFixture
} = require('./_utils.js')

describe('hey create', () => {
  before(() => {
    return createFixtures({
      'create': [],
      'createDeep': [],
      'createIn': []
    })
  })

  after(() => {
    return removeFixtures(['create', 'createDeep', 'createIn'])
  })

  it('creates the provided files', async () => {
    await runWithFixture('create', 'hey create foo.txt bar.js')
    await testFixture('create', ['foo.txt', 'bar.js'])
  })

  it('creates the provided files in the provided directory', async () => {
    await runWithFixture('createIn', 'hey create foo.txt bar.js in subDir')
    await testFixture('createIn', ['subDir/foo.txt', 'subDir/bar.js'])
  })

  it('creates the provided deep files', async () => {
    await runWithFixture('createDeep', 'hey create deeper/foo.txt bar.js in deep')
    await testFixture('createDeep', [
      'deep/deeper/foo.txt',
      'deep/bar.js'
    ])
  })
})
