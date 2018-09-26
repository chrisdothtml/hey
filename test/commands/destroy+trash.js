const {
  createFixtures,
  removeFixtures,
  runWithFixture,
  testFixture
} = require('./_utils.js')
const aliasMap = new Map([
  ['destroy', 'remove'],
  ['trash', 'delete']
])

// running the same suite for both aliases
for (const [ alias, command ] of aliasMap) {
  describe(`hey ${alias}`, () => {
    let fixtureNames

    before(async () => {
      fixtureNames = await createFixtures({
        [alias]: ['foo.txt', 'bar.js']
      })
    })

    after(() => {
      return removeFixtures(fixtureNames)
    })

    it(`is an alias for \`${command}\``, async () => {
      await runWithFixture(alias, `hey ${alias} *`)
      await testFixture(alias, [])
    })
  })
}
