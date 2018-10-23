import test from 'ava'
import {
  createFixtures,
  removeFixtures,
  runWithFixture
} from '../_utils.js'

const FIXTURES = {
  'find': ['foo.js']
}

let fixtureNames

test.before(async () => {
  fixtureNames = await createFixtures(FIXTURES)
})

test.after(() => {
  return removeFixtures(fixtureNames)
})

test('is an alias for `list`', async (t) => {
  const result = await runWithFixture('find', 'hey find *.js')

  t.deepEqual(
    result.split('\n').sort(),
    FIXTURES.find.sort()
  )
})
