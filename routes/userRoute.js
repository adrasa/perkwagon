const express = require('express');
const router = express.Router();
const addUserDetails = require('../controllers/userControllers/addUserDetails');
const tokenVerify = require('../middleware/tokenVerify');


//Define routes
router.post('/addUserDetails', tokenVerify, addUserDetails);

module.exports = router;