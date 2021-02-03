const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

//Registration
router.post('/api/register', userController.saveUser);
router.get('/user', userController.getUser);
router.post('/delete-user', userController.deleteUser);

//Login and logout
router.post('/api/login', userController.loginUser);
router.post('/logout', userController.logoutUser);

//Upload money to wallet
router.post('/payment-wallet', userController.paymentToWallet);

module.exports = router;