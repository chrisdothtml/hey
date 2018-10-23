import test from 'ava'
import {
  createFixtures,
  getFixturePath,
  removeFixtures,
  runWithFixture
} from '../_utils.js'

let fixtureNames

test.before(async () => {
  fixtureNames = await createFixtures({ 'where': [] })
})

test.after(() => {
  return removeFixtures(fixtureNames)
})

test('outputs the cwd', async (t) => {
  const result = await runWithFixture('where', 'hey where am I')
  t.true(result === getFixturePath('where'))
})
