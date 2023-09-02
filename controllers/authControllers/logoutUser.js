// Purpose: Logout user
const {  Auth } = require('../../models/index');

const loginUser = async(req, res) => {
    try {
        
        
        // get the user from the request
        const user = req.user;

        // find the user in the database
        
        const userInDb = await Auth.findOne({ where: { email: user.email } });
        
        // get the refresh token from the database
        const refreshTokens = userInDb.tokens.tokens;

        // delete the refresh token of the cookie from the database
        const newRefreshToken = refreshTokens.filter(token => token !== req.cookies.refreshToken);
        userInDb.tokens = { tokens: newRefreshToken };


        await userInDb.save();
        
        

        await res.clearCookie('refreshToken');
        res.status(200).json({ msg: "Logout successful" });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

module.exports = loginUser;