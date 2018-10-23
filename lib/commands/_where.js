/**
 * Print current working directory
 *
 * @example
 * hey where am i
*/
module.exports = function (command) {
  console.log(process.cwd())
}
