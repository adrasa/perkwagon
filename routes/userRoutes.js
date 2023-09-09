const express = require('express');
const router = express.Router();

const tokenVerify = require('../middleware/tokenVerify');

//userControllers
const getUserDetails = require('../controllers/userControllers/getUserDetails');
const editUserDetails = require('../controllers/userControllers/editUserDetails');
const getOrders = require('../controllers/userControllers/getOrders');
const getAddresses = require('../controllers/userControllers/getAddresses');
const editAddress = require('../controllers/userControllers/editAddress');
const addAddresses = require('../controllers/userControllers/addAddress');
const deleteAddress = require('../controllers/userControllers/deleteAddress');


//orderControllers
const addOrder = require('../controllers/orderControllers/addOrder');


// cart controllers
const getCart = require('../controllers/cartControllers/getCart');
const addToCart = require('../controllers/cartControllers/addToCart');
const removeFromCart = require('../controllers/cartControllers/removeFromCart');
const emptyCart = require('../controllers/cartControllers/emptyCart');
const changeQuantity = require('../controllers/cartControllers/changeQuantity');



const upload = require('../middleware/multerConfig');


//Define routes
router.get('/getUserDetails', tokenVerify, getUserDetails);
router.put('/updateUserDetails', tokenVerify, upload.single('profileImage'), editUserDetails);
router.get('/orders', tokenVerify, getOrders);
router.get('/addresses', tokenVerify, getAddresses);
router.put('/editAddress/:address_id', tokenVerify, editAddress);
router.post('/addAddress', tokenVerify, addAddresses);
router.delete('/deleteAddress/:address_id', tokenVerify, deleteAddress);




router.post('/addOrder', tokenVerify, addOrder);



// cart routes
router.get('/getCart', tokenVerify, getCart);
router.post('/addToCart', tokenVerify, addToCart);
router.post('/removeFromCart', tokenVerify, removeFromCart);
router.post('/emptyCart', tokenVerify, emptyCart);
router.post('/changeQuantity', tokenVerify, changeQuantity);

module.exports = router;