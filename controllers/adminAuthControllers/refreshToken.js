const tokenController = require('../../reusable_module/tokenController');
const { expiresInToMilliseconds } = require('../../reusable_module/utils');

const refreshToken = async (req, res) => {
    try {
        
        // get the refresh token from the cookie
        const refreshToken = req.cookies.refreshToken;

        // check if the refresh token exists
        if (!refreshToken) {
            return res.status(401).json({type:'UnauthorizedDevice',msg: 'No refresh token found, authorization denied' });
        }

        let user;
        // Verify the refresh token
        try {
            user = await tokenController.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET);
        } catch (err) {
            // clear the cookie in the frontend
            await res.clearCookie('refreshToken',{
                sameSite: "none",
                secure: true,
            });
            return res.status(401).json({type:'UnauthorizedDevice',msg: 'Invalid refresh token, authorization denied' });
        }

        // Generate new access token
        const accessToken = await tokenController.genToken(
            { admin_id: user.admin_id, email: user.email },
            process.env.JWT_ACCESS_EXPIRES_IN,
            process.env.JWT_ACCESS_SECRET
        );

        // Get the timestamp of the token expiration
        const tokenExpiration = new Date(Date.now() + expiresInToMilliseconds(process.env.JWT_ACCESS_EXPIRES_IN)).toISOString();

        //send response
        res.json({ msg: 'Refresh access token generated', accessToken, tokenExpiration, admin: true });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

module.exports = refreshToken