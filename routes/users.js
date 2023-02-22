const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const passportJWT = require('../middleware/passportJWT')
const checkAdmin = require('../middleware/checkAdmin')
const { body } = require('express-validator')


/* GET users listing. */
router.get('/',[passportJWT.isLogin,checkAdmin.isAdmin], userController.alluser)
router.post('/register', [
    body('name').not().isEmpty().withMessage("Name is required."),
    body('email').not().isEmpty().withMessage("Email is required.").isEmail().withMessage("Invalid email"),
    body('password').not().isEmpty().withMessage("Please enter your password.").isLength({min:8}).withMessage("Password must be at least 8 characters long.")
], userController.register)
router.post('/login', [
    body('email').not().isEmpty().withMessage("Email is required.").isEmail().withMessage("Invalid email"),
    body('password').not().isEmpty().withMessage("Please enter your password. ").isLength({min:8}).withMessage("Password must be at least 8 characters long.")
], userController.login)
router.get('/myaccount', [passportJWT.isLogin], userController.account)

module.exports = router;
