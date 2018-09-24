# hey

[![StandardJS](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![travis-ci build status](https://api.travis-ci.org/chrisdothtml/hey.svg?branch=master)](https://travis-ci.org/chrisdothtml/hey/branches)
[![appveyor build status](https://ci.appveyor.com/api/projects/status/a9pgib0css58hkhk/branch/master?svg=true)](https://ci.appveyor.com/project/chrisdothtml/hey)
[![Coverage status](https://coveralls.io/repos/github/chrisdothtml/hey/badge.svg)](https://coveralls.io/github/chrisdothtml/hey)

> A human-readable interface for terminal commands

## Install

```bash
$ yarn global add heycli

# npm works too
$ npm install --global heycli
```

## Use

#### Have a conversation with your terminal

```bash
$ hey where am I
```

#### Use normal file paths...

```bash
$ hey move assets/logo.png to images
```

#### ...or globs

```bash
$ hey destroy '**/bower.json' from ~/Projects
```

#### Let `hey` do the thinking for you

```bash
$ hey create package.json readme.md index.js in path/that/doesnt/exist/yet
```

See [command list](commands.md) for more info

## Reference

- [globby](https://github.com/sindresorhus/globby)

- [terminal cheatsheet](https://github.com/0nn0/terminal-mac-cheatsheet)

## License

[MIT](license)
