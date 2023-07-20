const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController')
const { body } = require('express-validator')
const passportJWT = require('../middleware/passportJWT')
const checkAdmin = require('../middleware/checkAdmin')

router.get('/', categoryController.index)
router.get('/:id', categoryController.show)
router.post('/', [passportJWT.isLogin,checkAdmin.isAdmin], [
    body('name').not().isEmpty().withMessage("Category name is required."),
    body('numOfProduct').isInt({min:0}).withMessage("Number of product must not be decimal number or negative number."),
], categoryController.insert) //validation
router.delete('/:id', [passportJWT.isLogin,checkAdmin.isAdmin], categoryController.destroy)
router.put('/:id', [passportJWT.isLogin,checkAdmin.isAdmin], [
    body('name').not().isEmpty().withMessage("Category name is required."),
    body('numOfProduct').isInt({min:0}).withMessage("Number of product must not be decimal number or negative number."),
], categoryController.update)


module.exports = router;
