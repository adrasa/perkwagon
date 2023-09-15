const {Users}=require('../../models/index');
const { Op } = require('sequelize');
const dateFilteredUsers=async(req,res)=>{
    try{
        const startDate = new Date(req.query.startDate); // Example: '2023-08-01'
        const endDate = new Date(req.query.endDate);  // Example: '2023-08-15'

        // Set the time to 23:59:59
        endDate.setHours(23, 59, 59, 0);
        const page = parseInt(req.query.page) || 1; // Get the requested page, default to 1
        const pageSize = parseInt(req.query.pageSize) || 10; // Set the number of items per page, default to 10

        const offset = (page - 1) * pageSize; // Calculate the offset based on the requested page
        const limit = pageSize;
        const userCount=await Users.count({
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        })
        const users = await Users.findAll({
            attributes: ['auth_id','full_name','phone_number','city','state','createdAt'],
            offset,
            limit,
            order: [['createdAt', 'DESC']],
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });
        if(!users || users.length===0) return res.status(400).json({ msg: 'No users found' });
        return res.status(200).json({ data:{users,userCount }});
    }catch(err){
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};
module.exports=dateFilteredUsers;