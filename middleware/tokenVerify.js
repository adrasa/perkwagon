const { BlockedToken } = require('../models/index');
const { verifyToken } = require('../reusable_module/tokenController');
const tokenVerify = async (req, res, next) => {
    try {
        //get token from query
        const authToken = req.headers.authorization;

        const tokenParts = authToken.split(' '); // Split "Bearer <token>"
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            return res.status(401).json({ type: 'invalidFormat', msg: 'Invalid/Expired link' });
        }
        const token = tokenParts[1]; // Extract the token

        // get the purpose of the token verification
        const purpose = req.headers.purpose;



        let secret;
        switch (purpose) {
            case "emailVerification":
                secret = process.env.JWT_SECRET;
                break;

            case "resetPassword":
                secret = process.env.JWT_SECRET;
                break;

            case "refreshToken":
                secret = process.env.JWT_REFRESH_SECRET;
                break;

            case "logout":
                secret = process.env.JWT_ACCESS_SECRET;
                break;

            case "logoutAll":
                secret = process.env.JWT_ACCESS_SECRET;
                break;

            case "verifyUser":
                secret = process.env.JWT_ACCESS_SECRET;
                break;

            case "verifyAdmin":
                secret = process.env.JWT_ACCESS_SECRET_ADMIN;
                break;

            case "refreshAdminToken":
                secret = process.env.JWT_REFRESH_SECRET_ADMIN;
                break;
            case "logoutAdmin":
                secret = process.env.JWT_ACCESS_SECRET_ADMIN;
                break;
            default:
                secret = process.env.JWT_SECRET;
                break;
        }



        if (!token) {
            return res.status(401).json({ type: 'tokenError', msg: 'No token provided' });

        }
        //check token is valid or not
        const invalidToken = await BlockedToken.findOne({ where: { token: token } });

        if (invalidToken) {
            return res.status(401).json({ type: 'blockedToken', msg: 'Invalid/Expired link' });
        }
        let decoded;
        try {
            //verify token
            decoded = await verifyToken(token, secret);
        } catch (error) {
            return res.status(401).json({ type: 'invalidToken', msg: 'Invalid/Expired link' });
        }

        //set user in req
        req.user = decoded;
        req.token = token;


        //next middleware
        next()
    } catch (error) {
        //set error in req
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};

module.exports = tokenVerify;
