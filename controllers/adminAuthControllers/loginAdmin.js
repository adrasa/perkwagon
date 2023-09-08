
const { Admin } = require('../../models/index');
const tokenController = require('../../reusable_module/tokenController');
const { expiresInToMilliseconds } = require('../../reusable_module/utils');
const bcrypt = require('bcryptjs');
require('dotenv/config');
const { validationResult } = require('express-validator');

const loginAdmin = async (req, res) => {

    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ type: 'validationError', msg: { errors: errors.array() } });
    }

    try {
        // Get data from request body
        const { email, password } = req.body;
        // Check if admin exists
        const admin = await Admin.findOne({ where: { email } });
        if (!admin) {
            return res.status(404).json({ type: 'adminError', msg: 'Admin not found' });
        }

        // Check if admin is verified
        if (admin.verified === false) {
            return res.status(401).json({ type: 'emailVerificationError', msg: 'Email not verified' });
        }

        // Check if password is correct
        const isPasswordMatch = await bcrypt.compare(password, admin.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ type:'invalid', msg: 'Invalid credentials' });
        }

        // check if the admin is already logged in from another device
        if(admin.token != null) {
            try {
                tokenController.verifyToken(admin.token,process.env.JWT_ACCESS_SECRET_ADMIN);
                return res.status(401).json({type : 'multipleLogIn', msg: 'Already logged in from another device'});
            } catch(err) {
                console.log();
            }
        }

        //Get Access Token
        const accessToken = await tokenController.genToken(
            { auth_id: admin.auth_id, email: admin.email },
            process.env.JWT_ACCESS_EXPIRES_IN,
            process.env.JWT_ACCESS_SECRET_ADMIN
        );
        
        // Get the timestamp of the token expiration
        const tokenExpiration = new Date(Date.now() + expiresInToMilliseconds(process.env.JWT_ACCESS_EXPIRES_IN)).toISOString();

        //Get Refresh Token
        const refreshToken = await tokenController.genToken(
            { auth_id: admin.auth_id, email: admin.email },
            process.env.JWT_REFRESH_EXPIRES_IN,
            process.env.JWT_REFRESH_SECRET_ADMIN
        );
        
        // Save refresh token to database
        admin.token = refreshToken; 
        await admin.save();
        

        // store refresh token into the cookie
        await res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            secure: true,
            sameSite: 'none'
        }).status(200).json({ msg: 'Login successful', accessToken, tokenExpiration });
        


    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

module.exports = loginAdmin;