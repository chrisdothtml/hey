const childProcess = require('child_process')
const del = require('del')
const globby = require('globby')
const meta = require('../../package.json')
const path = require('path')
const shell = require('shelljs')
const { expect } = require('chai')
const { promisify } = require('util')
const { isDirectory, makeDir } = require('../../lib/_utils.js')

const execFile = promisify(childProcess.execFile)
const ROOT_PATH = path.join(__dirname, '..', '..')
const BIN_PATH = path.join(ROOT_PATH, meta.bin.hey)
const FIXTURES_DIR = path.join(ROOT_PATH, '.temp')

exports.createFixtures = async function (fixtures) {
  await Promise.all(
    Object.keys(fixtures).map(async (fixtureName) => {
      const fixtureDir = path.join(FIXTURES_DIR, fixtureName)
      const filepaths = fixtures[fixtureName]

      await makeDir(fixtureDir, { silentFail: true })
      await Promise.all(
        filepaths
          // replace slashes with os-specific
          .map(filepath => filepath.replace(/\//g, path.sep))
          // prepend path to fixture dir
          .map(filepath => path.join(fixtureDir, filepath))
          .map(async (filepath) => {
            const { base, dir } = path.parse(filepath)
            const hasFile = isDirectory(base)
            const dirPath = hasFile ? filepath : dir

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
}

exports.removeFixtures = async function (fixtures = []) {
  return del(fixtures, { cwd: FIXTURES_DIR })
}

exports.runWithFixture = async function (fixture, command) {
  const fixtureDir = path.join(FIXTURES_DIR, fixture)
  const args = command.split(' ')

  return execFile(BIN_PATH, args.slice(1), { cwd: fixtureDir })
}

exports.testFixture = async function (fixture, expected) {
  const fixtureDir = path.join(FIXTURES_DIR, fixture)
  const filepaths = await globby('**/*', { cwd: fixtureDir, onlyFiles: false })

  expect(
    // filter out directories that have files in them
    // (i.e. only include directories in array if they're empty)
    filepaths.filter((filepath, i, filepaths) => {
      let dirAlreadyRepresented = false

      if (isDirectory(filepath)) {
        dirAlreadyRepresented = filepaths.some(otherFilepath => {
          return filepath === path.dirname(otherFilepath)
        })
      }

      return !dirAlreadyRepresented
    })
  ).to.have.members(expected)
}
