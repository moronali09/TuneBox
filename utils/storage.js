import fs from 'fs-extra';
import path from 'path';

export const STORAGE = '/tmp/storage';
fs.ensureDirSync(STORAGE);
export function resolve(name) { return path.join(STORAGE, name); }
