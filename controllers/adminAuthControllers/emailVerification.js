
const e = require('express');
const { BlockedToken, Admin } = require('../../models/index');
require('dotenv/config');

const emailVerification = async (req, res) => {
    try {

        //get data
        const user = req.user;
        const token = req.token;
        //update the verify status in database
        await Admin.update({ verified: true }, {
            where: {
                admin_id: user.admin_id
            }
        });


        // put the token into blocked token table
        await BlockedToken.create({ token: token, tokenExpiry: Date.now() + user.exp });

        //send response
        res.status(200).json({ msg: 'Successfully verified' });


    } catch (err) {

        res.status(400).json({ msg: 'Internal Server Error' });
    }

}

module.exports = emailVerification;