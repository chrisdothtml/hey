# Commands

- [create](#create)
- [delete](#delete)
- [destroy](#destroy)
- [find](#find)
- [list](#list)
- [make](#make)
- [remove](#remove)
- [trash](#trash)
- [where](#where)

## create

Create new files/directories

```bash
$ hey create dir/file.txt
$ hey create deep/dir/that/doesnt/exist
$ hey create file.txt other-file.txt in dir
$ hey create file.txt in dir/that/doesnt/exist
```

## delete

Move files/directories to trash

```bash
$ hey delete 'dir/*.txt'
$ hey delete '*.txt' from dir
$ hey delete '*.txt' in dir
```

## destroy

Alias for [remove](#remove)

## find

Alias for [list](#list)

## list

```bash
$ hey list '*.txt'
$ hey list '*.txt' in some/dir
$ hey list '*.txt' from some/dir
```

## make

Alias for [create](#create)

## remove

Remove files/directories (**does not move to trash; use [delete](#delete) or [trash](#trash) for that**)

```bash
$ hey remove 'dir/*.txt'
$ hey remove '*.txt' from dir
$ hey remove '*.txt' in dir
```

## trash

Alias for [delete](#delete)

## where

Print current working directory

```bash
$ hey where am i
```
