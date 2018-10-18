import path from 'path'
import test from 'ava'
import {
  createFixtures,
  FIXTURES_DIR,
  removeFixtures,
  runWithFixture
} from './_utils.js'

let fixtureNames

test.before(async () => {
  fixtureNames = await createFixtures({ 'where': [] })
})

test.after(() => {
  return removeFixtures(fixtureNames)
})

test('outputs the cwd', async (t) => {
  const result = await runWithFixture('where', 'hey where am I')
  t.true(result === path.join(FIXTURES_DIR, 'where'))
})
