# hey

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
$ hey delete '**/bower.json' from ~/Projects
```

#### Let `hey` do the thinking for you

```bash
$ hey create package.json readme.md index.js in path/that/doesnt/exist/yet
```

See [command list](commands.md) for more info

## Reference

- [node-glob](https://github.com/isaacs/node-glob)

- [terminal cheatsheet](https://github.com/0nn0/terminal-mac-cheatsheet)

## License

[MIT](license)
