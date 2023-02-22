const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController')
const { body } = require('express-validator')

router.get('/', categoryController.index)
router.get('/:id', categoryController.show)
router.post('/', [
    body('name').not().isEmpty().withMessage("Category name is required."),
    body('numOfProduct').isInt({min:0}).withMessage("Number of product must not be decimal number or negative number."),
], categoryController.insert) //validation
router.delete('/:id', categoryController.destroy)
router.put('/:id', [
    body('name').not().isEmpty().withMessage("Category name is required."),
    body('numOfProduct').isInt({min:0}).withMessage("Number of product must not be decimal number or negative number."),
], categoryController.update)


module.exports = router;
