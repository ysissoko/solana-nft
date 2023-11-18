const multer = require('multer');
const { extname } = require('path');
const { uploads } = require('src/services/config.service');

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, uploads.dir); // Set the upload directory
    },
    filename: (_req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + extname(file.originalname));
    },
});

module.exports = multer({ storage });
