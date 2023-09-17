const express = require('express');
router = express.Router();

const allProducts = require('../controllers/productControllers/allProducts');
const getCategories = require('../controllers/productControllers/getCategories');
const productsOfSubCategory = require('../controllers/productControllers/productsOfSubCategory');
router.get('/allProducts', allProducts);
router.get('/getCategories', getCategories);
router.get('/productsOfSubCategory', productsOfSubCategory);

module.exports = router;