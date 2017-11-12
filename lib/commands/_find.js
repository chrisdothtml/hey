const glob = require('glob')
const { relative } = require('path')
const { promisify } = require('util')

/*
  hey find '*.txt'
  hey find '*.txt' in some/dir
  hey find '*.txt' from some/dir
*/
module.exports = async function (command) {
  const { args, mods } = command
  const from = mods.in || mods.from || process.cwd()
  let paths = []

  await Promise.all(args.map(async (arg) => {
    const newPaths = await promisify(glob)(arg, {
      absolute: true,
      cwd: from,
      dot: true
    })

    paths = paths.concat(newPaths)
  }))

  if (paths.length) {
    console.log(
      paths
        .sort()
        .map(path => relative(process.cwd(), path))
        .join('\n')
    )
  }
}
