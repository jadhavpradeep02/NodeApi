const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const checkAuth = require('../middleware/check-auth');
const ProductController = require('../controllers/product');
const Product = require('../models/product');

router.get('/', checkAuth, ProductController.products_get_all);

router.post('/', checkAuth, upload.single('productImage'), ProductController.products_create_product);

router.get('/:productId', checkAuth, ProductController.products_get_product);

router.patch('/:productId', checkAuth, ProductController.products_update_product);

router.delete('/:productId', checkAuth, ProductController.products_delete_product);

module.exports = router;