/**
 * Config file
 */

import 'dotenv/config'
import path from 'path'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
  admins: process.env.BOT_ADMINS.split(','),
  getFilePath: (fileName) => {
    return path.resolve(__dirname, 'assets', fileName)
  }
}

export default config