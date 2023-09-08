const express = require('express');
router = express.Router();

const allProducts = require('../controllers/productControllers/allProducts');
const getCategories = require('../controllers/productControllers/getCategories');

router.get('/allProducts', allProducts);
router.get('/getCategories', getCategories);
