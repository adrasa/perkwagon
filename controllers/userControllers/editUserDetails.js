const { Users, Auth } = require('../../models/index');
const editUserDetails = async (req, res) => {
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
       
        const { full_name, phone_number, city, state } = req.body;

        const updatedUser = await Users.update(
            {
                full_name,
                phone_number,
                city,
                state,
            },
            {
                where: { auth_id: req.user.auth_id },
            }

        );
        updatedUser.dataValues.email = auth.email;
        updatedUser.dataValues.signup_date = auth.createdAt.toISOString().slice(0, 10);

        return res.status(200).json({ msg: 'User details updated successfully', user: updatedUser });
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
