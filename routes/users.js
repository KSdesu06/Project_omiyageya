const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const passportJWT = require('../middleware/passportJWT')
/* GET users listing. */
router.get('/', userController.user)
router.post('/', userController.register)
router.post('/login', userController.login)
router.get('/myaccount', [passportJWT.isLogin], userController.account)

module.exports = router;
