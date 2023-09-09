const { Users, Auth } = require('../../models/index');
const uploadImage = require('../../reusable_module/uploadFile')
const addUserDetails = async (req, res) => {
    try {
        const auth = Auth.findOne({
            where: { auth_id: req.user.auth_id },
            attributes: ['email', 'createdAt'],
        });
        if (!auth) {
            return res.status(404).json({ msg: 'User not found' });
        }
      
        let imageUrl = null;
        if (req.file) {
            // Generate CDN URL for the uploaded image
            imageUrl = await uploadImage(req.file.buffer, req.file.originalname);
        }
        const newUser = {
            auth_id: req.user.auth_id,
            full_name: req.body.full_name,
            phone_number: req.body.phone_number,
            profile_picture: imageUrl,
            city: req.body.city,
            state: req.body.state,
        }
        const user = await Users.create(newUser);

        user.dataValues.email = auth.email;
        user.dataValues.signup_date = await auth.createdAt;

        return res.status(201).json({ msg: 'User details added successfully', user });
    } catch (err) {

        return res.status(500).json({ msg:'Internal Server Error'});
    }
}
module.exports = addUserDetails;