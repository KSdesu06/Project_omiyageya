const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')

router.get('/', productController.index)
router.get('/:id', productController.show)
router.post('/', productController.insert) //validation
router.delete('/:id', productController.destroy)
router.put('/:id', productController.update)

module.exports = router;
