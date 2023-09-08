const { BlockedToken, Admin } = require('../../models/index');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');


const updatePassword = async (req, res) => {
    // Validate the request password validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
       
            //get data from request
            const token = req.token;
            const user = req.user;
            const { password } = req.body;

            

            //hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            //update password
            await Auth.update({ password: hashedPassword }, {
                where: {
                    admin_id: user.admin_id
                }
            });

            // put the token into blocked token table
            await BlockedToken.create({ token: token, tokenExpiry: Date.now()+user.exp });
            

            //send response
            res.status(200).json({ msg: 'Password updated successfully' });


       
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = updatePassword;