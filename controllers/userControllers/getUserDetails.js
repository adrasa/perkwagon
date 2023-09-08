const { Users, Auth } = require('../../models/index');
const getUserDetails = async (req, res) => {
    try {
        const auth = await Auth.findOne({
            where: { auth_id: req.user.auth_id },
            attributes: ['email', 'createdAt'],
        });
        if (!auth) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const user = await Users.findOne({
            where: { auth_id: req.user.auth_id },
        });

        user.dataValues.email = auth.email;
        user.dataValues.signup_date = auth.createdAt;

        return res.status(200).json({ user });
    } catch (err) {
        return res.status(500).json({ msg: 'Error Fetching User' });
    }
}

module.exports = getUserDetails;