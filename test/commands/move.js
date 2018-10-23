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
    'move': ['foo.txt'],
    'moveDeep': ['foo/bar.txt'],
    'moveFlat': [
      'images/foo.png',
      'pictures/bar.png'
    ],
    'moveFrom': ['foo/bar/baz.txt'],
    'moveToCwd': ['foo/bar.txt']
  })
})

test.after(() => {
  return removeFixtures(fixtureNames)
})

test('moves the provided files to the provided directory', async (t) => {
  await runWithFixture('move', 'hey move foo.txt into bar')
  await testFixture(t, 'move', ['bar/foo.txt'])
})

test('preserves directory structure in deep paths', async (t) => {
  await runWithFixture('moveDeep', 'hey move foo/*.txt into baz')
  await testFixture(t, 'moveDeep', ['baz/foo/bar.txt'])
})

test('preserves directory structure relative to from/in', async (t) => {
  await runWithFixture('moveFrom', 'hey move **/baz.txt from foo into baz')
  await testFixture(t, 'moveFrom', ['baz/bar/baz.txt'])
})

test('supports --flat flag', async (t) => {
  await runWithFixture('moveFlat', 'hey move **/*.png into assets/img --flat')
  await testFixture(t, 'moveFlat', [
    'assets/img/bar.png',
    'assets/img/foo.png'
  ])
})

test('supports moving files into cwd', async (t) => {
  await runWithFixture('moveToCwd', 'hey move foo/bar.txt into . --flat')
  await testFixture(t, 'moveToCwd', ['bar.txt'])
})
