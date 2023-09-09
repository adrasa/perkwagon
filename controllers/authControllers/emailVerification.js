
const {BlockedToken,Auth, Users} = require('../../models/index');
require('dotenv/config');

const verify = async (req, res) => {
    try {
      
            //get data
            const user = req.user;
            const token = req.token;
            //update the verify status in database
            await Auth.update({ verified: true }, {
                where: {
                    auth_id: user.auth_id
                }
            });

            await Users.create({
                auth_id:user.auth_id,
            })
            // put the token into blocked token table
            await BlockedToken.create({ token: token, tokenExpiry: Date.now()+user.exp });
            
            //send response
            res.status(200).json({ msg: 'Successfully verified' });

        
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ msg: 'Verification Failed' });
    }

}

module.exports = verify;