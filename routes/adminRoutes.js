const express = require('express');
const { check } = require('express-validator');

const loginAdmin = require('../controllers/adminAuthControllers/loginAdmin');
const registerAdmin = require('../controllers/adminAuthControllers/registerAdmin');
const logoutAdmin = require('../controllers/adminAuthControllers/logoutAdmin');
const tokenVerify = require('../middleware/tokenVerify');

const addSellerDetails = require('../controllers/sellerControllers/addSellerDetails');
const allSellers = require('../controllers/sellerControllers/allSellers');
const deleteSeller = require('../controllers/sellerControllers/deleteSeller');
const editSellerDetails = require('../controllers/sellerControllers/editSellerDetails');
const dateFilteredSellers = require('../controllers/sellerControllers/dateFilteredSellers');

const addProduct = require('../controllers/productControllers/addProduct');
const addCategory = require('../controllers/productControllers/addCatagory');
const allProductsOfSpecifiedSeller = require('../controllers/productControllers/allProductsOfSpecifiedSeller');
const deleteProduct = require('../controllers/productControllers/deleteProduct');
const editProduct = require('../controllers/productControllers/editProduct');
const addImage = require('../controllers/productControllers/addImage');
const deleteImage = require('../controllers/productControllers/deleteImage');
const dateFilteredProductsOfSpecifiedSeller = require('../controllers/productControllers/dateFilteredProductsOfSpecifiedSeller');



const router = express.Router();

const registerValidationRules = [
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const loginValidationRules = [
    check('email').isEmail().withMessage('Invalid email address'),
];



router.get('/logout', logoutAdmin);
router.post('/register', registerValidationRules, registerAdmin);
router.post('/login', loginValidationRules, loginAdmin);

router.post('/addSellerDetails', addSellerDetails);
router.get('/allSellers', allSellers);
router.delete('/deleteSeller/:seller_id', deleteSeller);
router.put('/updateUserDetails/:seller_id', editSellerDetails);
router.get('/dateFilteredSellers', dateFilteredSellers);

router.post('/addProduct', addCategory, addProduct)
router.get('/allProductsOfSpecifiedSeller/:seller_id', allProductsOfSpecifiedSeller);
router.put('/editProduct/:product_id', addCategory, editProduct);
router.delete('/deleteProduct/:product_id', deleteProduct);
router.post('/addImage/:product_id', addImage);
router.put('/deleteImage/:product_id', deleteImage);
router.get('/dateFilteredProductsOfSpecifiedSeller/:seller_id', dateFilteredProductsOfSpecifiedSeller)

module.exports = router;