const express = require('express');
const router = express.Router();

// const { signin, signup } = require('./userController');
const userController = require('./userController');
router.post('/signin', userController.signin);
router.post('/signup', userController.signup);

module.export = router;
