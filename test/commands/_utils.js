import childProcess from 'child_process'
import fse from 'fs-extra'
import globby from 'globby'
import meta from '../../package.json'
import path from 'path'
import { promisify } from 'util'
import { isDirectory, removeNonEmptyDirs } from '../../lib/utils.js'

const execFile = promisify(childProcess.execFile)
const ROOT_PATH = path.resolve(__dirname, '../..')
const BIN_PATH = path.resolve(ROOT_PATH, meta.bin.hey)

export const FIXTURES_DIR = path.join(ROOT_PATH, '.temp')

export function normalizeSlashes (type, filepath) {
  const slash = type === 'os' ? path.sep : type
  return filepath.replace(/\\|\//g, slash)
}

export async function createFixtures (fixtures) {
  const fixtureNames = Object.keys(fixtures)

  await Promise.all(
    fixtureNames.map(async (fixtureName) => {
      const fixtureDir = path.join(FIXTURES_DIR, fixtureName)
      const filepaths = fixtures[fixtureName]

      await fse.ensureDir(fixtureDir)
      await Promise.all(
        filepaths
          .map(normalizeSlashes.bind(null, 'os'))
          // prepend path to fixture dir
          .map(filepath => path.join(fixtureDir, filepath))
          .map(async (filepath) => {
            const { dir, name } = path.parse(filepath)
            const hasFile = isDirectory(name)
            const dirPath = hasFile ? dir : filepath

            await fse.ensureDir(dirPath)

            if (hasFile) {
              await fse.writeFile(filepath, '', 'utf-8')
            }
          })
      )
    })
  )

  return fixtureNames
}

export async function removeFixtures (fixtures = []) {
  return Promise.all(
    fixtures.map(async (fixtureName) => {
      return fse.remove(path.join(FIXTURES_DIR, fixtureName))
    })
  )
}

export async function runWithFixture (fixture, command) {
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

export async function testFixture (t, fixture, expected) {
  const fixtureDir = path.join(FIXTURES_DIR, fixture)
  const filepaths = await globby('**/*', {
    cwd: fixtureDir,
    onlyFiles: false,
    transform: normalizeSlashes.bind(null, '/')
  })

  t.deepEqual(
    filepaths.filter(removeNonEmptyDirs).sort(),
    expected.sort()
  )
}
