const {Orders, OrderItems,Users}=require('../../models/index');
const countSubtotal=require('../../reusable_module/calculateSubtotal')
const editOrder=async(req,res)=>{
    try{
        const order_id=req.params.order_id;
        const order=await Orders.findOne({where:{order_id:order_id}});
        
        if(!order){
            return res.status(404).json({msg:'Order Not Found'});
        }
        const user = await Users.findOne({ where: { auth_id: req.user.auth_id } });
        let amount=0;
        await Orders.update({
            payment_status:req.body.payment_status,
            payment_method:req.body.payment_method,
            transaction_id:req.body.transaction_id,
            address_id:req.body.address_id,
            total_amount:amount,
        },
        {where:{order_id:order_id}});

        const orderItems=req.body.orderItems;
        for(const item of orderItems){
            const sub_total=await countSubtotal(item.specification_id, item.quantity, user.membership_status)
            await OrderItems.update({
                product_id: item.product_id,
                specification_id: item.specification_id,
                seller_id: item.seller_id,
                quantity: item.quantity,
                sub_total: sub_total,
            }, 
            {
                where:{order_item_id:item.order_item_id}
            });

            amount+=sub_total;
        };

        await Orders.update({total_amount:amount},{where:{order_id:order_id}});

        return res.status(200).json({msg:'Order Updated Successfully'});
    }catch(error){
        return res.status(500).json({msg:'Internal Server Error'});
    }
}

module.exports=editOrder;