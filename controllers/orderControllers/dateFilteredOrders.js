const { Orders, OrderItems, Products, Addresses, Sellers, ProductSpecifications } = require('../../models/index');
const {Op}=require('sequelize');
const dateFilteredOrders = async (req, res) => {
    try {
        const startDate = new Date(req.query.startDate); // Example: '2023-08-01'
        const endDate = new Date(req.query.endDate);  // Example: '2023-08-15'

        // Set the time to 23:59:59
        endDate.setHours(23, 59, 59, 0);
        const page = parseInt(req.query.page) || 1; // Get the requested page, default to 1
        const pageSize = parseInt(req.query.pageSize) || 10; // Set the number of items per page, default to 10

        const offset = (page - 1) * pageSize; // Calculate the offset based on the requested page
        const limit = pageSize;
        const countOrder = await Orders.count({
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });
        const allOrders = await Orders.findAll({
            include: [{
                model: OrderItems,
                include: {
                    model: ProductSpecifications,
                    include: [{
                        model: Products,
                        
                    },
                    {
                        model: Sellers,
                    }],

                },
            },
            {
                model: Addresses,
            }],
            offset,
            limit,
            order: [['createdAt', 'DESC']],
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        return res.status(200).json({ data:{allOrders,countOrder} });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

module.exports = dateFilteredOrders;
