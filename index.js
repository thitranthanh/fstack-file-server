'use strict';

require('dotenv').config();
const express = require('express');
const argv   = require('yargs').argv
const bodyParser = require('body-parser');
const path = require('path');
const mime = require('mime');
const upload = require('./upload');
const FileUtil = require('./file-util');

const fs = require('fs');
const cors = require('cors');

const app = express();
const port = process.env.server_port || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.post('/upload', upload.single('file'), async function (req, res) {
    const filePath = path.join(__dirname, '/public/images');
    const fileUpload = new FileUtil(filePath);
    if (!req.file) {
      console.log('400 Bad request: please provide an image');
      res.status(400).json({error: 'Please provide an image'});
    }
    const extention = mime.getExtension(req.file.mimetype);
    const filename = await fileUpload.save(req.file.buffer, extention);
    return res.status(200).json({ name: filename +'.' + extention });
  });

app.listen(port, function () {
    let dir = path.join(__dirname, '/public');
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    dir = path.join(__dirname, '/public/images');
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    console.log('Server is running on port ' + port);
});

// catch all exception
process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
});