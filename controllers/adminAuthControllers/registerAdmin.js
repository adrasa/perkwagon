const {  Admin } = require('../../models/index');
const bcrypt = require('bcryptjs');
const cnfEmail = require('../../emailService/confirmEmailResolver');
require('dotenv/config');
const { validationResult } = require('express-validator');

const registerAdmin = async (req, res) => {
    //Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ type: 'validationError', msg: { errors: errors.array() } });
    }

    try {
        // Get data from request body
        const { email, password } = req.body;

        // Check if user exists
        let user = await Admin.findOne({ where: { email } });
        if (user) {
            return res.status(409).json({ type: 'emailError', msg: 'Email already exist' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        user = await Admin.create({ email: email, password: hashedPassword});

        
        //send confirmation email
        const msg = await cnfEmail(user,true);
        console.log(msg);


        //send response
        res.status(201).json({ msg: msg });


    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: 'Internal Server Error' });

    }
};
module.exports = registerAdmin;