'use strict';

require('dotenv').config();
const multer = require('multer');
const MAX_FILE_SIZE = process.env.max_file_size || 2;
const upload = multer({
  limits: {
    fileSize: MAX_FILE_SIZE * 1024 * 1024
  }
});

module.exports = upload;