require('app-module-path').addPath(__dirname);
require('dotenv').config();

const config = require('src/services/config.service');
const logger = require('src/logger');
const express = require('express');
const app = express();

app.use(express.static(config.uploads.dir))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/nft', require('src/routes/nft.route'));
app.use('/uploads', require('src/routes/upload.route'));

app.listen(config.app.port, () => {
    logger.info(`Process is running on port ${config.app.port}`)
});
