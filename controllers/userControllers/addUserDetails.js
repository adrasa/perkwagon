const {Users, Auth} = require('../../models/index');

const addUserDetails = async (req, res) => {
    try {
        const auth = Auth.findOne({ 
            where: { auth_id: req.user.auth_id } ,
            attributes: ['email', 'createdAt'],
        });
        if(!auth){
            return res.status(404).json({ msg: 'User not found' });
        }
        const newUser = {
            auth_id: req.user.auth_id,
            full_name: req.body.full_name,
            phone_number: req.body.phone_number,
            city: req.body.city,
            state: req.body.state,
        }
        const user = await Users.create(newUser);
        
        user.dataValues.email = auth.email;
        user.dataValues.signup_date = auth.createdAt.toISOString().slice(0, 10);

        return res.status(201).json({ msg: 'User created successfully', user});
    } catch (err) {
        return res.status(500).json({ error: 'Internel Server Error' });
    }
}
module.exports = addUserDetails;