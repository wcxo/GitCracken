/// <reference path="./types/index.d.ts" />

import * as path from "path";
import * as pkgDir from "pkg-dir";
import * as pJson from "./package.json";

/**
 * Base directory with package.json
 */
export const baseDir = pkgDir.sync(__dirname) as string;

/**
 * package.json
 */
export const packageJson: {
  name: string;
  description: string;
  author: string;
  maintainers: Array<{name: string; url: string}>;
  version: string;
  license: string;
  homepage: string;
} = pJson;
