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
    'moveFrom': []
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

test('supports --flat flag', async (t) => {
  await runWithFixture('moveFlat', 'hey move **/*.png into assets/img --flat')
  await testFixture(t, 'moveFlat', [
    'assets/img/bar.png',
    'assets/img/foo.png'
  ])
})
