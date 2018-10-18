import path from 'path'
import test from 'ava'
import {
  createFixtures,
  normalizeSlashes,
  removeFixtures,
  runWithFixture
} from './_utils.js'

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

let fixtureNames

test.before(async () => {
  fixtureNames = await createFixtures(FIXTURES)
})

test.after(() => {
  return removeFixtures(fixtureNames)
})

test('outputs files in current directory if no pattern provided', async (t) => {
  const result = await runWithFixture('list', 'hey list')

  t.deepEqual(
    normalizeSlashes('/', result).split('\n').sort(),
    FIXTURES.list.sort()
  )
})

test('outputs only files matching the provided pattern', async (t) => {
  const result = await runWithFixture('list', 'hey list *.js')

  t.deepEqual(
    normalizeSlashes('/', result).split('\n').sort(),
    FIXTURES.list.filter(filepath => path.extname(filepath) === '.js').sort()
  )
})

test('outputs deep files matching the provided pattern', async (t) => {
  const result = await runWithFixture('listDeep', 'hey list **/*')

  t.deepEqual(
    normalizeSlashes('/', result).split('\n').sort(),
    FIXTURES.listDeep.sort()
  )
})

test('outputs files matching the provided pattern from the provided directory', async (t) => {
  const result = await runWithFixture('listFrom', 'hey list *.* from subDir')

  t.deepEqual(
    normalizeSlashes('/', result).split('\n').sort(),
    FIXTURES.listFrom.sort()
  )
})
