const childProcess = require('child_process')
const fse = require('fs-extra')
const globby = require('globby')
const meta = require('../../package.json')
const path = require('path')
const shell = require('shelljs')
const { expect } = require('chai')
const { promisify } = require('util')
const { isDirectory, makeDir, removeNonEmptyDirs } = require('../../lib/_utils.js')

const execFile = promisify(childProcess.execFile)
const ROOT_PATH = path.resolve(__dirname, '../..')
const BIN_PATH = path.resolve(ROOT_PATH, meta.bin.hey)
const FIXTURES_DIR = path.join(ROOT_PATH, '.temp')

exports.FIXTURES_DIR = FIXTURES_DIR

function normalizeSlashes (type, filepath) {
  const slash = type === 'os' ? path.sep : type
  return filepath.replace(/\\|\//g, slash)
}
exports.normalizeSlashes = normalizeSlashes

exports.createFixtures = async function (fixtures) {
  const fixtureNames = Object.keys(fixtures)

  await Promise.all(
    fixtureNames.map(async (fixtureName) => {
      const fixtureDir = path.join(FIXTURES_DIR, fixtureName)
      const filepaths = fixtures[fixtureName]

      await makeDir(fixtureDir, { silentFail: true })
      await Promise.all(
        filepaths
          .map(normalizeSlashes.bind(null, 'os'))
          // prepend path to fixture dir
          .map(filepath => path.join(fixtureDir, filepath))
          .map(async (filepath) => {
            const { base, dir, name } = path.parse(filepath)
            const hasFile = isDirectory(name)
            const dirPath = hasFile ? dir : filepath

            await makeDir(dirPath, { silentFail: true })

            if (hasFile) {
              const origCwd = process.cwd()

              shell.cd(dirPath)
              shell.touch(base)
              shell.cd(origCwd)
            }
          })
      )
    })
  )

  return fixtureNames
}

exports.removeFixtures = async function (fixtures = []) {
  return Promise.all(
    fixtures.map(async (fixtureName) => {
      return fse.remove(path.join(FIXTURES_DIR, fixtureName))
    })
  )
}

exports.runWithFixture = async function (fixture, command) {
  const fixtureDir = fixture ? path.join(FIXTURES_DIR, fixture) : process.cwd()
  const args = command.split(' ')
  const result = await execFile(process.execPath, [BIN_PATH].concat(args.slice(1)), {
    cwd: fixtureDir,
    env: Object.assign({}, process.env, {
      // disable chalk colors
      FORCE_COLOR: 0
    })
  })

  return result.stderr || (result.stdout || '').replace(/\n$/, '')
}

exports.testFixture = async function (fixture, expected) {
  const fixtureDir = path.join(FIXTURES_DIR, fixture)
  const filepaths = await globby('**/*', {
    cwd: fixtureDir,
    onlyFiles: false,
    transform: normalizeSlashes.bind(null, '/')
  })

  expect(
    filepaths.filter(removeNonEmptyDirs)
  ).to.have.members(expected)
}
