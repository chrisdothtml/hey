import test from 'ava'
import { kebabToCamel, resolveDupeWritePath } from '../lib/utils.js'

test('kebabToCamel', (t) => {
  t.true(kebabToCamel('kebab-string') === 'kebabString')
  t.true(kebabToCamel('long-kebab-string') === 'longKebabString')
  t.true(kebabToCamel('alreadyCamel') === 'alreadyCamel')
})

// TODO: move test/commands/_utils.js to test/_utils; create fixture for this test
test('resolveDupeWritePath', (t) => {
  //
})
