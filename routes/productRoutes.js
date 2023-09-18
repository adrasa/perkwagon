const express = require('express');
const router = express.Router();

const allProducts = require('../controllers/productControllers/allProducts');
const getCategories = require('../controllers/productControllers/getCategories');
const productsOfSubCategory = require('../controllers/productControllers/productsOfSubCategory');
const searchProductsTagsAndName = require('../controllers/productControllers/searchProductsTagsAndName');
router.get('/allProducts', allProducts);
router.get('/getCategories', getCategories);
router.get('/productsOfSubCategory', productsOfSubCategory);
router.get('/searchProducts', searchProductsTagsAndName);
module.exports = router;