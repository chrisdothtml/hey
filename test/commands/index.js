import hey from '../../lib/index.js'
import path from 'path'
import test from 'ava'
import {
  createFixtures,
  FIXTURES_DIR,
  removeFixtures,
  runWithFixture,
  testFixture
} from '../_utils.js'

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

test.before(() => {
  return createFixtures({
    'api': []
  })
})

test.after(() => {
  return removeFixtures(['api'])
})

test('parses a string into arguments', async (t) => {
  await hey('make foo.txt', { cwd: path.join(FIXTURES_DIR, 'api') })
  await testFixture(t, 'api', ['foo.txt'])
})
