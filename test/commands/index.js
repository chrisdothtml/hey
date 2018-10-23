import hey from '../../lib/index.js'
import test from 'ava'
import {
  createFixtures,
  getFixturePath,
  removeFixtures,
  runWithFixture,
  testFixture
} from '../_utils.js'

let fixtureNames

test.before(async () => {
  fixtureNames = await createFixtures({
    'api': []
  })
})

test.after(() => {
  return removeFixtures(fixtureNames)
})

test('throws an error for invalid input', async (t) => {
  let result = ''

  try {
    await hey({})
  } catch (error) { result = error.message }

  t.true(result.includes('invalid input'))
})

test('throws an error for invalid commands', async (t) => {
  const result = await runWithFixture('', 'hey invalid')
  t.true(result.includes('invalid command'))
})

test('parses a string into arguments', async (t) => {
  await hey('make foo.txt', { cwd: getFixturePath('api') })
  await testFixture(t, 'api', ['foo.txt'])
})
