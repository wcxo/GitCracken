##  General Info

Crack version: 8.4.0 
Crack is valid for Gitkraken 8.x.x - 9.x.x (9.2.1 at 2023-03-18)

## Before patching (using crack)

1. Get The Legendary GitKraken Client from this [link](https://www.gitkraken.com/download). Click on button which corresponds to your OS requirements.
Gitkraken developers providers various installation methods for any OS. But take care if you on Linux. Please, do not use snap package manager, because you have no chances to activate it via this crack.

2. Install app via previously chosen method. When installation process is over, you will see app launched. You should close it immediately.
3. After that you need to install Node.js (and optionally yarn via npm). Node.js is required for correct Patch working.
   1. Visit [Node.js](https://nodejs.org/en/). As with Gitkraken client, you should choose platform-specific installation method.
   For windows just download Windows installer (.msi)
   For MacOs macOS Installer (.pkg).
   For Linux, you, obviously, can download archive (.tar.gz)/but i'd prefer to check this [link](https://nodejs.org/en/download/package-manager) for simplest and automated decision.
   2. For Linux/MacOs just install it, via chosen on previous substep. For Windows we have yet another step, sorry for that. By default, Windows OS has some restrictions in case scripts execution.
    So, we need fix it. Open PowerShell as admin and run:
   ```
   Set-ExecutionPolicy Unrestricted
   ```
   3. To complete Windows installation you must reboot your PC (laptop).
   4. Optionally install yarn, run:
   ```
   npm i -g yarn
   ```
Now you are ready. Follow steps below.

## Patching
1. Download GitKraken Crack from attachment of [Telegram channel](https://t.me/gitkrakencrackchat). Don't forget, any chat can have unbound count of attachments. Or follow [direct link to message with zip](https://t.me/gitkrakencrackchat/1086)
2. Unzip this via any available tool in some-folder.
3. Open *some-folder/GitCracken/* by Bash/CMD/PowerShel or any other terminal.
4. Execute series of commands:
   1. yarn install
   2. yarn build
   3. yarn gitcracken patcher

After last command just wait. Just in minute/seconds you will see message **Patching done !**. So, you can go and use this awesome client. Congrats !
If you want disable further updates of Gitkraken (to prevent Crack down), then read Hosts section. If you have any problems, Look at Q & A section of this document, or just ask [Telegram channel](https://t.me/gitkrakencrackchat). Our community always nice to help anybody in trouble. 

## Hosts
Add this line to your hosts file. By this action we forbid Client to check updates and so our Crack won't down.

```
0.0.0.0 release.gitkraken.com
```


Troubleshooting

1. Wrong Yarn version (``` 00h00m00s 0/0: : ERROR: [Errno 2] No such file or directory: 'install' ```)
   Currently this error occurs on debian-based distros due to wrong Yarn version installed by deafault.
   To solve this problem remove cmdtest and/or Yarn packages:
   ```
   sudo apt remove cmdtest
   sudo apt remove yarn
   ```
   Import Yarn GPG key, install Curl if needed. Then enable Yarn repository.
   ```
   curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
   echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
   ```
   Finally, update package lists and install Yarn.
   ```
   sudo apt-get update
   sudo apt-get install yarn -y
   ```
   Check Yarn version:
   ```
   yarn --version
   ```



Q & A

Q: How to configure GitLab via SSH ?
A: Go to File->Preferences->ssh in Gitkraken client. Press generate. Path to generated keys must not contain Cyrillic symbols.
Copy public key. Paste it into placeholder of GitLab->Preferences->SSH-Keys. Assign title and press add key. Done.

Q: How update Gitkraken to new versions after patching and locking hosts ?
A: Comment line in hosts file by adding # symbol at start of line. Update Gitkracken via File->check updates. Patch it again. remove comment (#) symbol to lock updates again.

