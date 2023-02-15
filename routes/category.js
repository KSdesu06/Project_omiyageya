const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.index)
router.get('/:id', categoryController.show)
router.post('/', categoryController.insert) //validation
router.delete('/:id', categoryController.destroy)
router.put('/:id', categoryController.update)


module.exports = router;
