const { where } = require('sequelize');
const { Orders, OrderItems } = require('../../models/index');

const addOrder = async (req, res) => {
    try {
        
        const newOrder = Orders.create({
            auth_id: req.user.auth_id,
            total_amount: amount,
            address_id: req.body.address_id,
            payment_status: req.body.payment_status,
            payment_method: req.body.payment_method,
            transaction_id: req.body.transaction_id,
        });

        const orderItems = req.body.orderItems;
        let amount=0;
        orderItems.forEach(async (item) => {

            const sub_total = await Products.findOne({ where: { product_id: item.product_id } }).then((product) => product.price * item.quantity);

            const orderItem=await OrderItems.create({
                order_id: newOrder.order_id,
                product_id: item.product_id,
                seller_id: item.seller_id,
                quantity: item.quantity,
                sub_total: sub_total,
            });

            amount+=sub_total;
        });

        await Orders.update({total_amount:amount}, {where:{order_id:newOrder.order_id}});

        return res.status(200).json({ msg: 'Order Placed Successfully' });
    } catch (error) {
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
}

module.exports = addOrder;