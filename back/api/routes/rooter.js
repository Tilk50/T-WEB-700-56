'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../helpers/security/authenticator');

//Import different controllers
const securityController = require('../controllers/security');
const userController = require('../controllers/user');
const adminController = require('../controllers/administrationTools');
const cryptoController = require('../controllers/crypto');
const priceController = require('../controllers/price');

/**
 * Routes for login and account creation
 */
router.post('/sign-in', securityController.sign_in);
router.post('/sign-up', securityController.sign_up);
router.post('/test-mail', securityController.test_mail);

/**
 * Routes to manage crypto
 */
router.get('/cryptos/', cryptoController.list);
router.get('/cryptos/:id', cryptoController.get);

/**
 * Route to manage prices
 */
router.get('/price/get-from-crypto/:id', priceController.getForChart);

/**
 * Routes for User information
 */
router.get('/user/getFavs', auth.isAuthenticated, userController.get_favs);


/**
 * Routes for admin user
 */
router.delete('/admin/user/:id', auth.isAuthenticated, auth.isAdmin, userController.delete);
router.get('/admin/user', auth.isAuthenticated, auth.isAdmin, userController.list);
router.get('/admin/importData', auth.isAuthenticated, auth.isAdmin, adminController.import_data);
router.post('/admin/hide-crypto/:id', auth.isAuthenticated, auth.isAdmin, adminController.hideCrypto);

module.exports = router;
