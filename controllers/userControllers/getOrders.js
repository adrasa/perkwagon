const {Orders, OrderItems, Products, Sellers, Addresses} = require('../../models/index');
const getOrders = async (req, res) => {
    try {
        const orders = await Orders.findAll({
            where: { auth_id: req.user.auth_id },
            attributes: ['order_id', 'total_amount', 'payment_status', 'payment_method','transaction_id','createAt'],
            include: [
                {
                    model: OrderItems,
                    attributes: ['order_item_id','quantity', 'sub_total', 'order_status', 'view_invoice'],
                    include: 
                    {
                        model: Products,
                        attributes: ['product_id','name', 'code','description','refundable','return_period','return_policy'],
                        include:
                        {
                            model: Sellers,
                            attributes: ['seller_id','seller_name'],
                        },
                        
                    },
                    
                },
                {
                    model: Addresses,
                    attributes: ['address_line_1', 'address_line_2', 'city', 'state', 'pincode', 'country','is_default'],
                }
            ],
        });
        return res.status(200).json({ orders });
    } catch (err) {
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
}

module.exports = getOrders;
