# Commands

- [create](#create)
- [delete](#delete)
- [find](#find)
- [make](#make)
- [where](#where)

### create

Create new files and/or directories

```bash
$ hey create dir/file.txt
$ hey create dir/that/doesnt/exist
$ hey create file.txt other-file.txt in dir
$ hey create file.txt in dir/that/doesnt/exist
```

### delete

Move files to trash

```bash
$ hey delete 'dir/*.txt'
$ hey delete '*.txt' from dir
$ hey delete '*.txt' in dir
```

### find

```bash
$ hey find '*.txt'
$ hey find '*.txt' in some/dir
$ hey find '*.txt' from some/dir
```

### make

Alias for `create`

### where

Print current working directory

```bash
$ hey where am I
```
