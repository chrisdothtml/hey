const path = require('path')
const { expect } = require('chai')
const {
  createFixtures,
  removeFixtures,
  runWithFixture
} = require('./_utils.js')

const FIXTURES = {
  'list': [
    'foo.js',
    'bar.txt',
    'baz.js'
  ],
  'listDeep': [
    'foo.js',
    'bar.txt',
    'baz.js',
    'subDir/foo.txt',
    'subDir/bar.js'
  ],
  'listFrom': [
    'subDir/foo.txt',
    'subDir/bar.js'
  ]
}

describe('hey list', () => {
  before(() => {
    return createFixtures(FIXTURES)
  })

  after(() => {
    return removeFixtures(Object.keys(FIXTURES))
  })

  it('outputs only files matching the provided pattern', async () => {
    const result = await runWithFixture('listJs', 'hey list *.js')

    expect(
      result.split('\n')
    ).to.have.members(
      FIXTURES.list.filter(filepath => path.extname(filepath) === '.js')
    )
  })

  it('outputs deep files matching the provided pattern', async () => {
    const result = await runWithFixture('listDeep', 'hey list **/*')

    expect(
      result.split('\n')
    ).to.have.members(FIXTURES.listDeep)
  })

  it('outputs files matching the provided pattern from the provided directory', async () => {
    const result = await runWithFixture('listFrom', 'hey list *.* from subDir')

    expect(
      result.split('\n')
    ).to.have.members(FIXTURES.listFrom)
  })
})
