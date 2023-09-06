const express = require('express');
const { check } = require('express-validator');

//middleware
const upload = require('../middleware/multerConfig');

//adminAuthControllers
const loginAdmin = require('../controllers/adminAuthControllers/loginAdmin');
const registerAdmin = require('../controllers/adminAuthControllers/registerAdmin');
const logoutAdmin = require('../controllers/adminAuthControllers/logoutAdmin');
const tokenVerify = require('../middleware/tokenVerify');

//sellerControllers
const addSellerDetails = require('../controllers/sellerControllers/addSellerDetails');
const allSellers = require('../controllers/sellerControllers/allSellers');
const deleteSeller = require('../controllers/sellerControllers/deleteSeller');
const editSellerDetails = require('../controllers/sellerControllers/editSellerDetails');
const dateFilteredSellers = require('../controllers/sellerControllers/dateFilteredSellers');
const searchSellers=require('../controllers/sellerControllers/searchSellers');


//productControllers
const addProduct = require('../controllers/productControllers/addProduct');
const addCategory = require('../controllers/productControllers/addCatagory');
const addSubCategory = require('../controllers/productControllers/addSubCategory');
const allProductsOfSpecifiedSeller = require('../controllers/productControllers/allProductsOfSpecifiedSeller');
const deleteProduct = require('../controllers/productControllers/deleteProduct');
const editProduct = require('../controllers/productControllers/editProduct');
const addImage = require('../controllers/productControllers/addImage');
const deleteImage = require('../controllers/productControllers/deleteImage');
const dateFilteredProductsOfSpecifiedSeller = require('../controllers/productControllers/dateFilteredProductsOfSpecifiedSeller');
const searchProductsOfSpecifiedSeller=require('../controllers/productControllers/searchProductsOfSpecifiedSeller');
const dateFilteredProducts=require('../controllers/productControllers/dateFilteredProducts');
const searchProducts=require('../controllers/productControllers/searchProducts');
const featuredProducts=require('../controllers/productControllers/featuredProducts');
const maxSoldProducts=require('../controllers/productControllers/maxSoldProducts');

//orderControllers
const allOrders = require('../controllers/orderControllers/allOrders');
const dateFilteredOrders = require('../controllers/orderControllers/dateFilteredOrders');
const deleteOrder = require('../controllers/orderControllers/deleteOrder');
const editOrder = require('../controllers/orderControllers/editOrder');
const addTrackingId = require('../controllers/orderControllers/addTrackingId');
const editTrackingId = require('../controllers/orderControllers/editTrackingId');
const addInvoice= require('../controllers/orderControllers/addInvoice');
const editInvoice = require('../controllers/orderControllers/editInvoice');


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


router.post('/addSellerDetails',tokenVerify ,addSellerDetails);
router.get('/allSellers', tokenVerify,allSellers);
router.delete('/deleteSeller/:seller_id', tokenVerify,deleteSeller);
router.put('/updateUserDetails/:seller_id', tokenVerify,editSellerDetails);
router.get('/dateFilteredSellers', tokenVerify,dateFilteredSellers);
router.get('/searchSellers', tokenVerify,searchSellers);


router.post('/addProduct', tokenVerify, upload.array('images'), tokenVerify,addCategory,addSubCategory, addProduct)
router.get('/allProductsOfSpecifiedSeller/:seller_id', tokenVerify, allProductsOfSpecifiedSeller);
router.put('/editProduct/:product_id', tokenVerify, addCategory,addSubCategory, editProduct);
router.delete('/deleteProduct/:product_id', tokenVerify, deleteProduct);
router.post('/addImage/:product_id', tokenVerify, upload.single('image'),addImage);
router.put('/deleteImage/:product_id', tokenVerify, deleteImage);
router.get('/dateFilteredProductsOfSpecifiedSeller/:seller_id', tokenVerify, dateFilteredProductsOfSpecifiedSeller)
router.get('/searchProductsOfSpecifiedSeller/:seller_id', tokenVerify, searchProductsOfSpecifiedSeller);
router.get('/dateFilteredProducts', tokenVerify, dateFilteredProducts);
router.get('/searchProducts', tokenVerify, searchProducts);
router.get('/featuredProducts', tokenVerify, featuredProducts);
router.get('/maxSoldProducts', tokenVerify, maxSoldProducts);



router.get('/allOrders', tokenVerify, allOrders);
router.get('/dateFilteredOrders', tokenVerify, dateFilteredOrders);
router.delete('/deleteOrder/:order_id', tokenVerify, deleteOrder);
router.put('/editOrder/:order_id', tokenVerify, editOrder);
router.patch('/addTrackingId/:order_item_id', tokenVerify, addTrackingId);
router.patch('/editTrackingId/:order_item_id', tokenVerify, editTrackingId);
router.patch('/addInvoice/:order_item_id',tokenVerify,upload.single('image'), addInvoice);
router.patch('/editInvoice/:order_item_id', tokenVerify, upload.single('image'), editInvoice);

module.exports = router;