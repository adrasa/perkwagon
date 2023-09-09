
const {Auth} = require('../../models/index');
const tokenController = require('../../reusable_module/tokenController');
const { expiresInToMilliseconds } = require('../../reusable_module/utils');
const bcrypt = require('bcryptjs');
require('dotenv/config');
const { validationResult } = require('express-validator');

const loginUser = async (req, res) => {

    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ type: 'validationError', msg: { errors: errors.array() } });
    }

    try {
        // Get data from request body
        const { email, password } = req.body;
        // Check if user exists
        const user = await Auth.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ type: 'userError', msg: 'User not found' });
        }

        // Check if user is verified
        if (user.verified === false) {
            return res.status(401).json({ type: 'emailVerificationError', msg: 'Email not verified' });
        }

        // Check if password is correct
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ type:'invalid', msg: 'Invalid credentials' });
        }

        // check if user is already logged in by checking the refresh token in cookie
        if(req.cookies.refreshToken && user.tokens.tokens.includes(req.cookies.refreshToken)){
            console.log(req.cookies.refreshToken);
            return res.status(400).json({ type: 'alreadyLoggedIn', msg: 'User already logged in' });
        } 

        //Get Access Token
        const accessToken = await tokenController.genToken(
            { auth_id: user.auth_id, email: user.email },
            process.env.JWT_ACCESS_EXPIRES_IN,
            process.env.JWT_ACCESS_SECRET
        );
        
        // Get the timestamp of the token expiration
        const tokenExpiration = new Date(Date.now() + expiresInToMilliseconds(process.env.JWT_ACCESS_EXPIRES_IN)).toISOString();

        //Get Refresh Token
        const refreshToken = await tokenController.genToken(
            { auth_id: user.auth_id, email: user.email },
            process.env.JWT_REFRESH_EXPIRES_IN,
            process.env.JWT_REFRESH_SECRET
        );
        
        // Save refresh token to database
        user.tokens = { tokens: [...user.tokens.tokens, refreshToken] };
        await user.save();
        

        // store refresh token into the cookie
        await res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            secure: true,
            sameSite: 'none'
<<<<<<< HEAD
        }).status(200).json({ msg: 'Login successful', typeofuser: user.typeofuser, accessToken, tokenExpiration, isAdmin: false });
=======
        }).status(200).json({ msg: 'Login successful', accessToken, tokenExpiration ,isAdmin:false});
>>>>>>> refs/remotes/origin/main
        


    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

module.exports = loginUser;
