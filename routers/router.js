//routers/dm.router.js

//import controllers
const controller = require('../controllers/controllerWithMongo');

//create Router instance from express import
const router = require('express').Router();

//routes definitions//
console.log('router called...');
//Test database
router.get('/test/:type', controller.testdb);
//login: check if logged in. If not, log user in
router.post('/login', controller.isNotLoggedIn, controller.login);
//log out user if the user is logged in
router.get('/logout', controller.isLoggedIn, controller.logout);
//change password: send generate and send otp to user  
router.post('/verify-otp', controller.verifyOtp);
//change password: receive otp from user
router.post('/reset-password', controller.changePassword);
//get user's details: username, email,phone, profile picture, and interests
router.get('/profile', controller.getProfileData);
//Check if a username,email or phone number is taken
router.get('/validate', controller.validate);
//Ask server to generate and send otp to this user
router.get('/request-otp', controller.otpRequest);
//Check that the SMS OTP sent by user is the same as the one sent to them
router.post('/verify-phone', controller.verifyPhone);
//Check that the SMS OTP sent by user is the same as the one sent to them
router.get('/verify-email/:id', controller.verifyEmail);
//Change password of an already logged in user.
router.post('/update-password', controller.isLoggedIn, controller.updatePassword);
//Get user's email address
router.get('/get-email', controller.isLoggedIn, controller.getEmail);
//Get user's email address
router.get('/get-username', controller.isLoggedIn, controller.getUsername);
//Change email of an already logged in user.
router.post('/update-email', controller.isLoggedIn, controller.updateEmail);
//Change username of an already logged in user.
router.post('/update-username', controller.isLoggedIn, controller.updateUsername);
//get front page data
router.get('/', controller.isLoggedIn, controller.getFrontPageItems);

//export router instance
module.exports = router;