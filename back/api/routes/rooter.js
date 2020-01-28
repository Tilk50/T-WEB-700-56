'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../helpers/security/authenticator');

//Import different controllers
const securityController = require('../controllers/security');


/**
 * Route definition
 **/

/**
 * Route for login and account creation
 */
router.post('/sign-in', securityController.sign_in);
router.post('/sign-up', securityController.sign_up);
router.post('/test-mail', securityController.test_mail);


module.exports = router;
