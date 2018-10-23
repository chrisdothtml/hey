import test from 'ava'
import {
  createFixtures,
  removeFixtures,
  runWithFixture,
  testFixture
} from '../_utils.js'

let fixtureNames

test.before(async () => {
  fixtureNames = await createFixtures({
    'create': [],
    'createDeep': [],
    'createDuplicate': ['foo.txt'],
    'createIn': []
  })
})

test.after(() => {
  return removeFixtures(fixtureNames)
})

test('creates the provided files', async (t) => {
  await runWithFixture('create', 'hey create foo.txt bar.js baz')
  await testFixture(t, 'create', ['foo.txt', 'bar.js', 'baz'])
})

test('creates the provided files in the provided directory', async (t) => {
  await runWithFixture('createIn', 'hey create foo.txt bar.js in subDir')
  await testFixture(t, 'createIn', ['subDir/foo.txt', 'subDir/bar.js'])
})

test('creates the provided deep files', async (t) => {
  await runWithFixture('createDeep', 'hey create deeper/foo.txt bar.js in deep')
  await testFixture(t, 'createDeep', [
    'deep/deeper/foo.txt',
    'deep/bar.js'
  ])
})

test('warns if a provided file already exists', async (t) => {
  const result = await runWithFixture('createDuplicate', 'hey create foo.txt')
  t.true(result.includes('already exists: foo.txt'))
})
