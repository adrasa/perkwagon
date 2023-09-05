const express = require('express');
const { check } = require('express-validator');

const loginAdmin = require('../controllers/adminAuthControllers/loginAdmin');
const registerAdmin = require('../controllers/adminAuthControllers/registerAdmin');
const logoutAdmin = require('../controllers/adminAuthControllers/logoutAdmin');
const tokenVerify = require('../middleware/tokenVerify');


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



module.exports = router;