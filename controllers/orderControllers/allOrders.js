const { Orders, OrderItems, Products, Addresses, Sellers } = require('../../models/index');

const allOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Get the requested page, default to 1
        const pageSize = parseInt(req.query.pageSize) || 10; // Set the number of items per page, default to 10

        const offset = (page - 1) * pageSize; // Calculate the offset based on the requested page
        const limit = pageSize;
        
        const allOrders = await Orders.findAll({
            include: [{
                model: OrderItems,
                as: 'orderItems',
                attributes: ['order_item_id', 'quantity', 'sub_total', 'order_status', 'view_invoice'],
                include: {
                    model: Products,
                    attributes: ['product_id','product_name', 'price'],
                    include: {
                        model: Sellers,

                        attributes: ['seller_id','seller_name', 'business_email', 'business_phone_number','business_whatapp_number'],
                    },
                },
            },
            {
                model: Addresses,

                attributes: ['address_id','address_line_1', 'address_line_2', 'city', 'state', 'pincode', 'country'],
            }],
            attributes: ['order_id', 'auth_id', 'total_amount', 'payment_status', 'payment_method', 'createdAt'],
            offset,
            limit,
            order: [['createdAt', 'DESC']],
        });

        return res.status(200).json({ allOrders });
    } catch (error) {
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};

module.exports = allOrders;
