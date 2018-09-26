const { expect } = require('chai')
const {
  createFixtures,
  removeFixtures,
  runWithFixture,
  testFixture
} = require('./_utils.js')

describe('hey create', () => {
  let fixtureNames

  before(async () => {
    fixtureNames = await createFixtures({
      'create': [],
      'createDeep': [],
      'createDuplicate': ['foo.txt'],
      'createIn': []
    })
  })

  after(() => {
    return removeFixtures(fixtureNames)
  })

  it('creates the provided files', async () => {
    await runWithFixture('create', 'hey create foo.txt bar.js baz')
    await testFixture('create', ['foo.txt', 'bar.js', 'baz'])
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

  it('warns if a provided file already exists', async () => {
    const result = await runWithFixture('createDuplicate', 'hey create foo.txt')
    expect(result).to.include('create: already exists: foo.txt')
  })
})
