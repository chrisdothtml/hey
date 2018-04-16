const {
  createFixtures,
  removeFixtures,
  runWithFixture,
  testFixture
} = require('../_utils.js')

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
    await runWithFixture('create', `hey create one.txt two.js`)
    await testFixture('create', ['one.txt', 'two.js'])
  })

  it('creates the provided files in the provided directory', async () => {
    await runWithFixture('createIn', `hey create one.txt two.js in subDir`)
    await testFixture('createIn', ['subDir/one.txt', 'subDir/two.js'])
  })

  it('creates the provided deep files', async () => {
    await runWithFixture('createDeep', `hey create deeper/one.txt two.js in deep`)
    await testFixture('createDeep', [
      'deep/deeper/one.txt',
      'deep/two.js'
    ])
  })
})
