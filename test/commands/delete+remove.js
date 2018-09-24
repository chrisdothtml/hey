const {
  createFixtures,
  removeFixtures,
  runWithFixture,
  testFixture
} = require('./_utils.js')

// running the same suite for both commands
for (const command of ['delete', 'remove']) {
  describe(`hey ${command}`, () => {
    before(() => {
      return createFixtures({
        [command]: ['foo.txt', 'bar.js'],
        [`${command}From`]: ['subDir/foo.txt', 'subDir/bar.js']
      })
    })

    after(() => {
      return removeFixtures([command, `${command}From`])
    })

    it(`${command}s the provided files`, async () => {
      await runWithFixture(command, `hey ${command} *`)
      await testFixture(command, [])
    })

    it(`${command}s the provided files from the provided directory`, async () => {
      await runWithFixture(`${command}From`, `hey ${command} * from subDir`)
      await testFixture(`${command}From`, ['subDir'])
    })
  })
}
