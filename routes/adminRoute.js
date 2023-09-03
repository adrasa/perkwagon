const express = require('express');
const router = express.Router();

const addSellerDetails = require('../controllers/sellerControllers/addSellerDetails');
const allSellers = require('../controllers/sellerControllers/allSellers');
const deleteSeller = require('../controllers/sellerControllers/deleteSeller');
const editSellerDetails = require('../controllers/sellerControllers/editSellerDetails');


const addProduct=require('../controllers/productControllers/addProduct');
const addCategory = require('../controllers/productControllers/addCatagory');
const allProductsOfSpecifiedSeller = require('../controllers/productControllers/allProductsOfSpecifiedSeller');
const deleteProduct = require('../controllers/productControllers/deleteProduct');
const editProduct = require('../controllers/productControllers/editProduct');
const addImage=require('../controllers/productControllers/addImage');
const deleteImage=require('../controllers/productControllers/deleteImage');



router.post('/addSellerDetails', addSellerDetails);
router.get('/allSellers', allSellers);
router.delete('/deleteSeller/:seller_id', deleteSeller);
router.put('/updateUserDetails/:seller_id', editSellerDetails);

router.post('/addProduct',addCategory,addProduct)
router.get('/allProductsOfSpecifiedSeller/:seller_id',allProductsOfSpecifiedSeller);
router.put('/editProduct/:product_id',addCategory,editProduct);
router.delete('/deleteProduct/:product_id', deleteProduct);
router.post('/addImage/:product_id',addImage);
router.put('/deleteImage/:product_id',deleteImage);

module.exports=router;