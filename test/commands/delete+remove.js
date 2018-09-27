const {
  createFixtures,
  removeFixtures,
  runWithFixture,
  testFixture
} = require('./_utils.js')

// running the same suite for both commands
for (const command of ['delete', 'remove']) {
  describe(`hey ${command}`, () => {
    let fixtureNames

    before(async () => {
      fixtureNames = await createFixtures({
        [command]: [
          'foo.txt',
          'bar.js'
        ],
        [`${command}Dir`]: [
          'foo.txt',
          'subDir/dir1/foo.txt',
          'subDir/dir2/foo.txt'
        ],
        [`${command}From`]: [
          'subDir/foo.txt',
          'subDir/bar.js'
        ]
      })
    })

    after(() => {
      return removeFixtures(fixtureNames)
    })

    it(`${command}s the provided files`, async () => {
      await runWithFixture(command, `hey ${command} *`)
      await testFixture(command, [])
    })

    it(`${command}s the provided directories`, async () => {
      await runWithFixture(`${command}Dir`, `hey ${command} subDir/*`)
      await testFixture(`${command}Dir`, ['foo.txt', 'subDir'])
    })

    it(`${command}s the provided files from the provided directory`, async () => {
      await runWithFixture(`${command}From`, `hey ${command} * from subDir`)
      await testFixture(`${command}From`, ['subDir'])
    })
  })
}
