import test from 'ava'
import {
  createFixtures,
  removeFixtures,
  runWithFixture,
  testFixture
} from '../_utils.js'

const aliasMap = new Map([
  ['destroy', 'remove'],
  ['trash', 'delete']
])

// running the same suite for both aliases
for (const [ alias, command ] of aliasMap) {
  let fixtureNames

  test.before(async () => {
    fixtureNames = await createFixtures({
      [alias]: ['foo.txt', 'bar.js']
    })
  })

  test.after(() => {
    return removeFixtures(fixtureNames)
  })

  test(`is an alias for \`${command}\``, async (t) => {
    await runWithFixture(alias, `hey ${alias} *`)
    await testFixture(t, alias, [])
  })
}
