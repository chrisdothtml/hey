import test from 'ava'
import {
  createFixtures,
  removeFixtures,
  runWithFixture,
  testFixture
} from './_utils.js'

let fixtureNames

test.before(async () => {
  fixtureNames = await createFixtures({
    'make': []
  })
})

test.after(() => {
  return removeFixtures(fixtureNames)
})

test('is an alias for `create`', async (t) => {
  await runWithFixture('make', 'hey make foo.txt')
  await testFixture(t, 'make', ['foo.txt'])
})
