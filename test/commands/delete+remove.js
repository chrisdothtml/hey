import test from 'ava'
import {
  createFixtures,
  removeFixtures,
  runWithFixture,
  testFixture
} from '../_utils.js'

// running the same suite for both commands
for (const command of ['delete', 'remove']) {
  let fixtureNames

  test.before(async () => {
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

  test.after(() => {
    return removeFixtures(fixtureNames)
  })

  test(`${command}s the provided files`, async (t) => {
    await runWithFixture(command, `hey ${command} *`)
    await testFixture(t, command, [])
  })

  test(`${command}s the provided directories`, async (t) => {
    await runWithFixture(`${command}Dir`, `hey ${command} subDir/*`)
    await testFixture(t, `${command}Dir`, ['foo.txt', 'subDir'])
  })

  test(`${command}s the provided files from the provided directory`, async (t) => {
    await runWithFixture(`${command}From`, `hey ${command} * from subDir`)
    await testFixture(t, `${command}From`, ['subDir'])
  })
}
