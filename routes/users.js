const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

/* GET users listing. */
router.get('/', userController.user)
router.post('/', userController.register)
router.post('/login', userController.login)
router.get('/youraccount', userController.account)

module.exports = router;
