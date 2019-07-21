'use strict';

require('dotenv').config();
const sharp = require('sharp');
const uuidv4 = require('uuid/v4');
const path = require('path');

class FileUtil {
  constructor(folder) {
    this.folder = folder;
  }
  async save(buffer, mineType) {
    const filename = FileUtil.filename();
    const filepathOriginal = this.filepath(filename + '.' + mineType);

    await sharp(buffer)
      .toFile(filepathOriginal);
    
    return filename;
  }
  static filename() {
    return `${uuidv4()}`;
  }
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}
module.exports = FileUtil;