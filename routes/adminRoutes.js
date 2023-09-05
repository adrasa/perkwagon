const express = require('express');
const { check } = require('express-validator');

//middleware
const upload = require('../middleware/multerConfig');

//adminAuthControllers
const loginAdmin = require('../controllers/adminAuthControllers/loginAdmin');
const registerAdmin = require('../controllers/adminAuthControllers/registerAdmin');
const logoutAdmin = require('../controllers/adminAuthControllers/logoutAdmin');

//sellerControllers
const addSellerDetails = require('../controllers/sellerControllers/addSellerDetails');
const allSellers = require('../controllers/sellerControllers/allSellers');
const deleteSeller = require('../controllers/sellerControllers/deleteSeller');
const editSellerDetails = require('../controllers/sellerControllers/editSellerDetails');
const dateFilteredSellers = require('../controllers/sellerControllers/dateFilteredSellers');

//productControllers
const addProduct = require('../controllers/productControllers/addProduct');
const addCategory = require('../controllers/productControllers/addCatagory');
const allProductsOfSpecifiedSeller = require('../controllers/productControllers/allProductsOfSpecifiedSeller');
const deleteProduct = require('../controllers/productControllers/deleteProduct');
const editProduct = require('../controllers/productControllers/editProduct');
const addImage = require('../controllers/productControllers/addImage');
const deleteImage = require('../controllers/productControllers/deleteImage');
const dateFilteredProductsOfSpecifiedSeller = require('../controllers/productControllers/dateFilteredProductsOfSpecifiedSeller');

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

router.post('/addSellerDetails', addSellerDetails);
router.get('/allSellers', allSellers);
router.delete('/deleteSeller/:seller_id', deleteSeller);
router.put('/updateUserDetails/:seller_id', editSellerDetails);
router.get('/dateFilteredSellers', dateFilteredSellers);

router.post('/addProduct', upload.array('images'), addCategory, addProduct)
router.get('/allProductsOfSpecifiedSeller/:seller_id', allProductsOfSpecifiedSeller);
router.put('/editProduct/:product_id', addCategory, editProduct);
router.delete('/deleteProduct/:product_id', deleteProduct);
router.post('/addImage/:product_id', upload.single('image'),addImage);
router.put('/deleteImage/:product_id', deleteImage);
router.get('/dateFilteredProductsOfSpecifiedSeller/:seller_id', dateFilteredProductsOfSpecifiedSeller)

router.get('/allOrders', allOrders);
router.get('/dateFilteredOrders', dateFilteredOrders);
router.delete('/deleteOrder/:order_id', deleteOrder);
router.put('/editOrder/:order_id', editOrder);
router.patch('/addTrackingId/:order_item_id', addTrackingId);
router.patch('/editTrackingId/:order_item_id', editTrackingId);
router.patch('/addInvoice/:order_item_id',upload.single('image'), addInvoice);
router.patch('/editInvoice/:order_item_id', upload.single('image'), editInvoice);

module.exports = router;