import path from 'path'
import test from 'ava'
import { kebabToCamel, resolveDupeWritePath } from '../lib/utils.js'
import { createFixtures, getFixturePath, removeFixtures } from './_utils.js'

let fixtureNames

test.before(async () => {
  fixtureNames = await createFixtures({
    'resolveDupeWritePath': [
      'foo.txt',
      'bar.txt',
      'bar (1).txt',
      'baz (1).txt'
    ]
  })
})

test.after(() => {
  return removeFixtures(fixtureNames)
})

test('kebabToCamel', (t) => {
  t.true(kebabToCamel('kebab-string') === 'kebabString')
  t.true(kebabToCamel('long-kebab-string') === 'longKebabString')
  t.true(kebabToCamel('alreadyCamel') === 'alreadyCamel')
})

test('resolveDupeWritePath', (t) => {
  const fixturePath = getFixturePath('resolveDupeWritePath')

  async function testFile (input, expected) {
    const fullExpected = path.join(fixturePath, expected)
    const output = await resolveDupeWritePath(
      path.join(fixturePath, input)
    )

    t.true(output === fullExpected)
  }

  return Promise.all([
    testFile('foo.txt', 'foo (1).txt'),
    testFile('bar.txt', 'bar (2).txt'),
    testFile('baz.txt', 'baz.txt')
  ])
})
