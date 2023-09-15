const {Users}=require('../../models/index');
const { Op } = require('sequelize');
const searchUsers=async(req,res)=>{
    try{
        const search=req.query.search;
        const page = parseInt(req.query.page) || 1; // Get the requested page, default to 1
        const pageSize = parseInt(req.query.pageSize) || 10; // Set the number of items per page, default to 10

        const offset = (page - 1) * pageSize; // Calculate the offset based on the requested page
        const limit = pageSize;
        const userCount=await Users.count({
            where: {
                [Op.or]: [
                    {
                        auth_id: {
                            [Op.like]: `${search}%`, // Case-insensitive, initial match for product ID
                        },

                    },
                    {
                        email: {
                            [Op.like]: `${search}%`, // Case-insensitive, initial match for product ID
                        },
                    },
                ]
            },
        })
        const users = await Users.findAll({
            attributes: ['auth_id','full_name','email','phone_number','city','state','createdAt'],
            offset,
            limit,
            order: [['createdAt', 'DESC']],
            where: {
                [Op.or]: [
                    {
                        auth_id: {
                            [Op.like]: `${search}%`, // Case-insensitive, initial match for product ID
                        },

                    },
                    {
                        email: {
                            [Op.like]: `${search}%`, // Case-insensitive, initial match for product ID
                        },
                    },
                ]
            },
            collate: 'utf8mb4_general_ci',// Add the COLLATE clause for case-insensitive matching
        });
        if(!users || users.length===0) return res.status(400).json({ msg: 'No users found' });
        return res.status(200).json({ data:{users,userCount} });
    }catch(err){
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};
module.exports=searchUsers;