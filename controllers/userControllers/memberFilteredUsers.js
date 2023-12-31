const { Users } = require('../../models/index');
const memberFilteredUsers = async (req, res) => {
    try {
        const member = req.query.member;
        const page = parseInt(req.query.page) || 1; // Get the requested page, default to 1
        const pageSize = parseInt(req.query.pageSize) || 10; // Set the number of items per page, default to 10

        const offset = (page - 1) * pageSize; // Calculate the offset based on the requested page
        const limit = pageSize;
        const userCount=await Users.count({
            where: {
                membership_status: member,
            }
        })
        const users = await Users.findAll({
            attributes: ['auth_id', 'full_name', 'phone_number', 'city', 'state', 'createdAt'],
            offset,
            limit,
            order: [['createdAt', 'DESC']],
            where: {
                membership_status: member,
            }
        });
        return res.status(200).json({ data:{users,userCount} });
    } catch (err) {
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};
module.exports = memberFilteredUsers;