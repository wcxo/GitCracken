# GitCracken
GitKraken utils for non-commercial use

Working on `GNU/Linux` (without `snap`), `Windows` and `macOS`.

Author: PMExtra, forked from KillWolfVlad at [GitKraken-AUR](https://github.com/KillWolfVlad/GitKraken-AUR)

✔ Verified with GitKraken v7.7.0 ~ v8.1.1

It should support any newer version of GitKraken, unless the entrypoint code (`src/main/static/startMainProcess.js` of GitKraken source) is modified.

## Requirements

- `Node.js` v12 LTS or later
- `yarn`

## Quick start

- `git clone https://github.com/PMExtra/GitCracken.git`
- `cd GitCracken/GitCracken/`
- `yarn install`
- `yarn build`
- `yarn gitcracken patcher`

## Notice

### It need to refresh the GitKraken account information after this patch

This patch will modify your license while GitKraken fetching your profile. So if you still got free edition, you should re-login your GitKraken account.

Please ensure the communication with GitKraken server. Somebody may blocked the GitKraken server by the DNS or hosts file, please comment out or remove it temporarily.

If you still got free edition after re-login. Deleting the local profile might help. (Usually the path is `%appdata%\.gitkraken` for Windows, or `~/.gitkraken` for Linux or macOS)

### On macOS you should patch GitKraken after first launch.

There is a quarantine flag while downloading an App from Internet. If you changed it before the first launch, macOS will think the App was broken.

If you already do that, you can execute `sudo xattr -rd com.apple.quarantine /Application/GitKraken.app` to remove quarantine flag.

Search `macos quarantine` for more details.

### This patch only works with GitKraken 7.7.0 and later

If you really want to use an older version, you can ref the commit [`011e42e`](https://github.com/PMExtra/GitCracken/commit/011e42ee8f203b30e4fd606ac47af88293fbbf10) for 7.6.x.
For more older version, you can use the original patcher from [5cr1pt/GitKraken](https://github.com/5cr1pt/GitCracken/commit/192c695e0e850676a3c014295636b46471887477).

### Disable Automatic Update

The patch will be overwrite after each GitKraken update. So you should patch again after each update.

If you don't want any update, you can block the update server. Just add this content to your `hosts` file:

```text
0.0.0.0 release.gitkraken.com
```
