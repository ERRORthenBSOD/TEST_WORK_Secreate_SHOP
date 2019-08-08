const express = require('express');
const compression = require('compression');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = (app) => {
	app.use(compression({ level: 1 }));
	app.use(cors());
	app.use(bodyParser.json({ limit: '10mb', type: 'application/json' }));
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use('/static', express.static(`${__dirname}/../images`));
	app.use(fileUpload({
		useTempFiles : true,
		tempFileDir : '/tmp/',
		limits: { fileSize: 10 * 1024 * 1024 }
	}));
};
