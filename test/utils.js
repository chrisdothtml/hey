import test from 'ava'
import { kebabToCamel } from '../lib/utils.js'

test('kebabToCamel', (t) => {
  t.true(kebabToCamel('kebab-string') === 'kebabString')
  t.true(kebabToCamel('long-kebab-string') === 'longKebabString')
  t.true(kebabToCamel('alreadyCamel') === 'alreadyCamel')
})
