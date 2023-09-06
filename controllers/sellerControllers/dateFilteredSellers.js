const { Sellers } = require('../../models/index');
const { Op } = require('sequelize');
const dateFilteredSellers = async (req, res) => {
    try {
        const startDate = new Date(req.query.startDate); // Example: '2023-08-01'
        const endDate = new Date(req.query.endDate);  // Example: '2023-08-15'

        // Set the time to 23:59:59
        endDate.setHours(23, 59, 59, 0);
        const page = parseInt(req.query.page) || 1; // Get the requested page, default to 1
        const pageSize = parseInt(req.query.pageSize) || 10; // Set the number of items per page, default to 10

        const offset = (page - 1) * pageSize; // Calculate the offset based on the requested page
        const limit = pageSize;

        const sellers = await Sellers.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
            offset,
            limit,
            order: [['createdAt', 'DESC']],
        });
        if(!sellers) return res.status(400).json({ msg: 'No sellers found' });
        res.status(200).json({sellers});
    } catch (err) {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}
module.exports = dateFilteredSellers;