// Purpose: Logout user
const { Admin } = require('../../models/index');

const logoutAdmin = async (req, res) => {
    try {


        // get the user from the request
        const user = req.user;

        // find the user in the database

        const adminInDb = await Admin.findOne({ where: { email: user.email } });

        // get the refresh token from the database
        const refreshToken = adminInDb.token;

        // delete the refresh token of the cookie from the database
        adminInDb.token = null;


        await userInDb.save();



        await res.clearCookie('refreshToken', {
            sameSite: "none",
            secure: true,
        });
        res.status(200).json({ msg: "Logout successful" });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

module.exports = logoutAdmin;