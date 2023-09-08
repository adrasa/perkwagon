const { Users, Auth } = require('../../models/index');
const uploadImage = require('../../reusable_module/uploadFile');
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
        const updatedFields = {};

        if (req.file) {
            // Generate CDN URL for the uploaded image
            updatedFields.profile_picture = await uploadImage(req.file.buffer, req.file.originalname);
        }

        if (full_name) {
            updatedFields.full_name = full_name;
        }
        if (phone_number) {
            updatedFields.phone_number = phone_number;
        }
        if (city) {
            updatedFields.city = city;
        }
        if (state) {
            updatedFields.state = state;
        }
        await Users.update(
            updatedFields,
            {
                where: { auth_id: req.user.auth_id },
            }

        );

        const updatedUser = await Users.findOne({
            where: { auth_id: req.user.auth_id },
            attributes: ['full_name', 'phone_number', 'profile_picture', 'city', 'state'],
        });

        updatedUser.dataValues.email = auth.email;
        updatedUser.dataValues.signup_date = auth.createdAt;

        return res.status(200).json({ msg: 'User details updated successfully', user: updatedUser });
    } catch (err) {
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
}

module.exports = editUserDetails;
