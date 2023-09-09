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



module.exports = router;