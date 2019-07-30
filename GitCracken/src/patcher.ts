import * as os from "os";
import * as path from "path";

import * as asar from "asar";
import * as diff from "diff";
import * as fs from "fs-extra";
import natsort from "natsort";

import {baseDir} from "../global";
import {CURRENT_PLATFORM, Platforms} from "./platform";

/**
 * Patcher
 */
export class Patcher {
  private static findAsarUnix(...files: string[]): string | undefined {
    return files.find((file) => fs.existsSync(file));
  }

  private static findAsarLinux(): string | undefined {
    return Patcher.findAsarUnix(
      "/opt/gitkraken/resources/app.asar", // Arch Linux
      "/usr/share/gitkraken/resources/app.asar", // deb & rpm
    );
  }

  private static findAsarWindows(): string | undefined {
    const gitkrakenLocal: string = path.join(
      os.homedir(),
      "AppData/Local/gitkraken",
    );
    if (!fs.existsSync(gitkrakenLocal)) {
      return undefined;
    }
    const apps = fs
      .readdirSync(gitkrakenLocal)
      .filter((item) => item.startsWith("app"));
    apps.sort(natsort());
    let app = apps.length === 0 ? undefined : apps[apps.length - 1];
    if (!app) {
      return undefined;
    }
    app = path.join(gitkrakenLocal, app, "resources/app.asar");
    return fs.existsSync(app) ? app : undefined;
  }

  private static findAsarMacOS(): string | undefined {
    return Patcher.findAsarUnix(
      "/Applications/GitKraken.app/Contents/Resources/app.asar",
    );
  }

  private static findAsar(dir?: string): string | undefined {
    if (dir) {
      return path.normalize(dir) + ".asar";
    }
    switch (CURRENT_PLATFORM) {
      case Platforms.linux:
        return Patcher.findAsarLinux();
      case Platforms.windows:
        return Patcher.findAsarWindows();
      case Platforms.macOS:
        return Patcher.findAsarMacOS();
    }
  }

  private static findDir(asarFile: string): string {
    return path.join(
      path.dirname(asarFile),
      path.basename(asarFile, path.extname(asarFile)),
    );
  }

  private readonly _asar: string;
  private readonly _dir: string;
  private readonly _features: string[];

  /**
   * Patcher constructor
   * @param asarFile app.asar file
   * @param dir app.asar directory
   * @param features Patcher features
   */
  public constructor(asarFile?: string, dir?: string, ...features: string[]) {
    const _asar = asarFile || Patcher.findAsar(dir);
    if (!_asar) {
      throw new Error(`Can't find app.asar!`);
    }
    this._asar = _asar;
    this._dir = dir || Patcher.findDir(this._asar);
    this._features = features;
  }

  /**
   * app.asar file
   */
  public get asar(): string {
    return this._asar;
  }

  /**
   * app.asar directory
   */
  public get dir(): string {
    return this._dir;
  }

  /**
   * Patcher features
   */
  public get features(): string[] {
    return this._features;
  }

  /**
   * Backup app.asar file
   * @throws Error
   */
  public backupAsar(): string {
    const backup: string = `${this.asar}.${new Date().getTime()}.backup`;
    fs.copySync(this.asar, backup);
    return backup;
  }

  /**
   * Unpack app.asar file
   * @throws Error
   */
  public unpackAsar(): void {
    asar.extractAll(this.asar, this.dir);
  }

  /**
   * Pack app.asar directory
   * @throws Error
   */
  public packDirAsync(): Promise<void> {
    return asar.createPackage(this.dir, this.asar);
  }

  /**
   * Remove app.asar directory
   * @throws Error
   */
  public removeDir(): void {
    fs.removeSync(this.dir);
  }

  /**
   * Patch app.asar directory
   * @throws Error
   */
  public patchDir(): void {
    for (const feature of this.features) {
      const patches = diff.parsePatch(
        fs.readFileSync(
          path.join(baseDir, "patches", `${feature}.diff`),
          "utf8",
        ),
      );
      for (const patch of patches) {
        const sourceData = fs.readFileSync(
          path.join(this.dir, patch.oldFileName as string),
          "utf8",
        );
        if (patch.oldFileName !== patch.newFileName) {
          fs.unlinkSync(path.join(this.dir, patch.oldFileName as string));
        }
        const sourcePatchedData = diff.applyPatch(sourceData, patch);
        fs.writeFileSync(
          path.join(this.dir, patch.newFileName as string),
          sourcePatchedData,
        );
      }
    }
  }
}
