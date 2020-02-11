# GitCracken

GitKraken utils for non-commercial use

Author: KillWolfVlad at [GitKraken-AUR](https://github.com/KillWolfVlad/GitKraken-AUR)

Working on `GNU/Linux`, `Windows` and `macOS`!

> WARNING! On `macOS` you should patch `GitKraken` only after first launch and full program closing!
>
> WARNING! Do not install `GitKraken` from `snap` on `Ubuntu`, patcher wont be able to work. Use common installation.

## Requirements

- `Node.js` v10 LTS or later
- `Yarn`

## Usage

- `yarn install`
- `yarn build`
- `node dist/bin/gitcracken.js --help` for more usage information

If Yarn does not work (can't download sevmer package), use Npm:
- `npm install`
- `npm run build`

### Patcher

```bash
$ yarn run gitcracken patcher [options] [actions...]
```

`actions` - array of values (any order, any count)

> If `actions` is empty, will be used `auto` mode (ideal for beginners)

| Action   | Description                           |
|----------|---------------------------------------|
| `backup` | Backup `app.asar` file                |
| `unpack` | Unpack `app.asar` file into directory |
| `patch`  | Patch directory                       |
| `pack`   | Pack directory to `app.asar`          |
| `remove` | Remove directory                      |

| Option      | Description (if not defined, will be used `auto` value) |
|-------------|---------------------------------------------------------|
| `--asar`    | Path to `app.asar` file                                 |
| `--dir`     | Path to directory                                       |
| `--feature` | Patcher feature (from [patches](patches) dir)           |

> You can invoke `--feature` several times to apply all patches!

#### Examples

`Auto` patch installed `GitKraken` (maybe require `sudo` privileges on `GNU/Linux`)

```bash
$ yarn run gitcracken patcher
```

Use custom path to `app.asar`

```bash
$ yarn run gitcracken patcher --asar ~/Downloads/gitkraken/resources/app.asar
```

Use custom `actions` (`backup`, `unpack` and `patch`)

```bash
$ yarn run gitcracken patcher backup unpack patch
```

 Mac from sudo
```bash
sh-3.2# cd /.../Projects\ From\ GIT/GitCracken/GitCracken/dist/bin
sh-3.2# yarn run gitcracken.js patcher --asar /Applications/GitKraken.app/Contents/Resources/app.asar
```
