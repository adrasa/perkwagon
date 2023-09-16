const { Orders, OrderItems,Users } = require('../../models/index');
const countSubtotal = require('../../reusable_module/calculateSubtotal');
const addOrder = async (req, res) => {
    try {
        let amount = 0;
        const user=await Users.findOne({where:{auth_id:req.user.auth_id}});
        const newOrder = Orders.create({
            auth_id: req.user.auth_id,
            total_amount: amount,
            address_id: req.body.address_id,
            payment_status: req.body.payment_status,
            payment_method: req.body.payment_method,
            transaction_id: req.body.transaction_id,
        });

        const orderItems = req.body.orderItems;
        
        for(const item of orderItems) {

            const sub_total=await countSubtotal(item.specification_id, item.quantity, user.membership_status)

            await OrderItems.create({ 
                order_id: newOrder.order_id,
                product_id: item.product_id,
                specification_id: item.specification_id,
                seller_id: item.seller_id,
                quantity: item.quantity,
                sub_total: sub_total,
            });

            amount+=sub_total;
        };

        await Orders.update({total_amount:amount}, {where:{order_id:newOrder.order_id}});

        return res.status(200).json({ msg: 'Order Placed Successfully' });
    } catch (error) {
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
}

module.exports = addOrder;