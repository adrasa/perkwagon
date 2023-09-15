const express = require('express');
const { check } = require('express-validator');

//middleware
const upload = require('../middleware/multerConfig');

//adminAuthControllers
const loginAdmin = require('../controllers/adminAuthControllers/loginAdmin');
const registerAdmin = require('../controllers/adminAuthControllers/registerAdmin');
const logoutAdmin = require('../controllers/adminAuthControllers/logoutAdmin');
const tokenVerify = require('../middleware/tokenVerify');
const emailVerification = require('../controllers/adminAuthControllers/emailVerification');
const forgetPassword = require('../controllers/adminAuthControllers/forgetPassword');
const refreshToken = require('../controllers/adminAuthControllers/refreshToken');
const updatePassword = require('../controllers/adminAuthControllers/updatePassword');
const resendEmail = require('../controllers/adminAuthControllers/resendEmail');

//sellerControllers
const addSellerDetails = require('../controllers/sellerControllers/addSellerDetails');
const allSellers = require('../controllers/sellerControllers/allSellers');
const deleteSeller = require('../controllers/sellerControllers/deleteSeller');
const editSellerDetails = require('../controllers/sellerControllers/editSellerDetails');
const dateFilteredSellers = require('../controllers/sellerControllers/dateFilteredSellers');
const searchSellers = require('../controllers/sellerControllers/searchSellers');


//productControllers
const addProduct = require('../controllers/productControllers/addProduct');
const allProductsOfSpecifiedSeller = require('../controllers/productControllers/allProductsOfSpecifiedSeller');
const deleteProduct = require('../controllers/productControllers/deleteProduct');
const editProduct = require('../controllers/productControllers/editProduct');
const addImage = require('../controllers/productControllers/addImage');
const deleteImage = require('../controllers/productControllers/deleteImage');
const dateFilteredProductsOfSpecifiedSeller = require('../controllers/productControllers/dateFilteredProductsOfSpecifiedSeller');
const searchProductsOfSpecifiedSeller = require('../controllers/productControllers/searchProductsOfSpecifiedSeller');
const dateFilteredProducts = require('../controllers/productControllers/dateFilteredProducts');
const searchProducts = require('../controllers/productControllers/searchProducts');
const featuredProducts = require('../controllers/productControllers/featuredProducts');
const maxSoldProducts = require('../controllers/productControllers/maxSoldProducts');
const addCategory = require('../controllers/productControllers/addCatagory');
const addSubCategory = require('../controllers/productControllers/addSubCategory');
const deleteCategory = require('../controllers/productControllers/deleteCategory');
const deleteSubCategory = require('../controllers/productControllers/deleteSubCategory');




//orderControllers
const allOrders = require('../controllers/orderControllers/allOrders');
const dateFilteredOrders = require('../controllers/orderControllers/dateFilteredOrders');
const deleteOrder = require('../controllers/orderControllers/deleteOrder');
const editOrder = require('../controllers/orderControllers/editOrder');
const addTrackingId = require('../controllers/orderControllers/addTrackingId');
const editTrackingId = require('../controllers/orderControllers/editTrackingId');
const addInvoice = require('../controllers/orderControllers/addInvoice');
const editInvoice = require('../controllers/orderControllers/editInvoice');


//user controllers
const allUsers = require('../controllers/userControllers/allUsers');
const dateFilteredUsers = require('../controllers/userControllers/dateFilteredUsers');
const memberFilteredUsers = require('../controllers/userControllers/memberFilteredUsers');
const searchUsers = require('../controllers/userControllers/searchUsers');

const router = express.Router();


const registerValidationRules = [
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const loginValidationRules = [
    check('email').isEmail().withMessage('Invalid email address'),
];

const updatePasswordRules = [
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];


router.get('/logout', tokenVerify, logoutAdmin);
router.post('/register', registerValidationRules, registerAdmin);
router.post('/login', loginValidationRules, loginAdmin);
router.get('/verifyEmail', tokenVerify, emailVerification);
router.get('/refreshtoken', refreshToken);
router.post('/forgetPassword', loginValidationRules, forgetPassword);
router.patch('/resetPassword', tokenVerify, updatePasswordRules, updatePassword);
router.post('/resendEmail', resendEmail);





router.post('/addSellerDetails', tokenVerify, addSellerDetails);
router.get('/allSellers', tokenVerify, allSellers);
router.delete('/deleteSeller/:seller_id', tokenVerify, deleteSeller);
router.put('/updateSellerDetails/:seller_id', tokenVerify, editSellerDetails);
router.get('/dateFilteredSellers', tokenVerify, dateFilteredSellers);
router.get('/searchSellers', tokenVerify, searchSellers);


router.post('/addCategory', tokenVerify, upload.single('categoryImage'),addCategory);
router.post('/addSubCategory', tokenVerify,upload.single('subcategoryImage'), addSubCategory);
router.delete('/deleteCategory/:category_id', tokenVerify, deleteCategory);
router.delete('/deleteSubCategory/:subcategory_id', tokenVerify, deleteSubCategory);
router.post('/addProduct', tokenVerify, upload.array('productImages'), addProduct)
router.get('/allProductsOfSpecifiedSeller/:seller_id', tokenVerify, allProductsOfSpecifiedSeller);
router.put('/editProduct/:product_id', tokenVerify, upload.array('productImages'), editProduct);
router.delete('/deleteProduct/:product_id', tokenVerify, deleteProduct);
router.post('/addImage/:product_id', tokenVerify, upload.single('productImage'), addImage);
router.patch('/deleteImage/:product_id', tokenVerify, deleteImage);
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
router.patch('/addInvoice/:order_item_id', tokenVerify, upload.single('invoiceImage'), addInvoice);
router.patch('/editInvoice/:order_item_id', tokenVerify, upload.single('invoceImage'), editInvoice);




router.get('/allUsers', tokenVerify, allUsers);
router.get('/dateFilteredUsers', tokenVerify, dateFilteredUsers);
router.get('/memberFilteredUsers', tokenVerify, memberFilteredUsers);
router.get('/searchUsers', tokenVerify, searchUsers);




module.exports = router;