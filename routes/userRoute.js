const express = require('express');
const router = express.Router();
const tokenVerify = require('../middleware/tokenVerify');
const addUserDetails = require('../controllers/userControllers/addUserDetails');
const getUserDetails = require('../controllers/userControllers/getUserDetails');
const editUserDetails = require('../controllers/userControllers/editUserDetails');
const getOrders = require('../controllers/userControllers/getOrders');
const getAddresses = require('../controllers/userControllers/getAddresses');
const editAddress = require('../controllers/userControllers/editAddress');
const addAddresses = require('../controllers/userControllers/addAddress');
const deleteAddress = require('../controllers/userControllers/deleteAddress');


//Define routes
router.post('/addUserDetails', tokenVerify, addUserDetails);
router.get('/getUserDetails', tokenVerify, getUserDetails);
router.put('/updateUserDetails', tokenVerify, editUserDetails);
router.get('/orders',tokenVerify, getOrders);
router.get('/addresses', tokenVerify, getAddresses);
router.put('/editAddress/:address_id', tokenVerify, editAddress);
router.post('addAddress', tokenVerify, addAddresses);
router.delete('/deleteAddress/:address_id', tokenVerify, deleteAddress);
module.exports = router;