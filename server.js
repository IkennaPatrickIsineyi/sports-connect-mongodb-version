//dm.app.js

//import router
const router = require('./routers/dm.router.js');

//import setupDatabase from controller
const setupDatabase = require('./controllers/controller.js').setupDatabase;

//import express module
const express = require('express');

//import path module 
const path = require('path');

//import cors module for cross origin
const cors = require('cors');

//import dotenv
require('dotenv/config');

//import express-session
const session = require('express-session');

//import express-fileupload for processing files
const fileUpload = require('express-fileupload');

//import helmet for security 
const helmet = require('helmet');

//create instance of express app
const app = express();

//load session
app.use(session({
	name: 'brilconapp',
	secret: 'fine wine',
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 86400000
	}
}));

//get port value from environment
const PORT = process.env.PORT || 7972;

//define dir path
const dir = path.join(__dirname, 'frontend', 'build');

//load urlencoded middleware
app.use(express.urlencoded({ extended: true }));

//load json middleware
app.use(express.json());

//load cors middleware 
app.use(cors({ origin: true, credentials: true }));

//load static files middleware 
app.use(express.static(dir));

//load middleware for processing received files
app.use(fileUpload());

//install router for '/api' path. All '/api' requests will be 
//processed through the routes defined in router
app.use("/api", router);

//define route for every other get requests not related to /api path
app.get("/*", function (req, res) {
	const indexPagePath = path.join(__dirname, 'frontend', 'build', 'index.html');
	res.sendFile(indexPagePath);
});

//define callback function for launching server
const launchServer = () => {
	app.listen(PORT, (error) => {
		if (error) throw error;
		else {
			console.log("Server launched on port ", PORT);
			app.emit('server_started');
		}
	});
};

//call setupDatabase with callback to launch server after setting up database.
setupDatabase(launchServer);

//export app instance for testing purpose
module.exports = app;