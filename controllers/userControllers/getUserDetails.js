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
            attributes: ['full_name', 'phone_number', 'city', 'state'],
        });
        
        user.dataValues.email = auth.email;
        user.dataValues.signup_date = auth.createdAt.toISOString().slice(0, 10);

        return res.status(200).json({ user });
    } catch (err) {
        return res.status(500).json({ error: 'Error fetching user' });
    }
}

module.exports = getUserDetails;