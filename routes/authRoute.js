const express = require('express');
const { check } = require('express-validator');

const registerUser = require('../controllers/authControllers/registerUser');
const loginUser = require('../controllers/authControllers/loginUser');
const emailVerification = require('../controllers/authControllers/emailVerification');
const forgetPassword = require('../controllers/authControllers/forgetPassword');
const refreshToken = require('../controllers/authControllers/refreshToken');
const updatePassword = require('../controllers/authControllers/updatePassword');
const resendEmail = require('../controllers/authControllers/resendEmail');
const tokenVerify = require('../middleware/tokenVerify');
const logoutUser = require('../controllers/authControllers/logoutUser');
const logoutAll = require('../controllers/authControllers/logoutAll');



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

// Define routes
router.get('/verifyEmail', tokenVerify, emailVerification);
router.post('/register', registerValidationRules, registerUser);
router.post('/login', loginValidationRules, loginUser);
router.get('/refreshtoken', tokenVerify, refreshToken);
router.post('/forgetPassword', loginValidationRules, forgetPassword);
router.patch('/resetPassword', tokenVerify, updatePasswordRules, updatePassword);
router.post('/resendEmail', resendEmail);
router.get('/logout', tokenVerify, logoutUser);
router.get('/logoutAll', tokenVerify, logoutAll);
module.exports = router;
