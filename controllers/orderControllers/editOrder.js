const {Orders, OrderItems}=require('../../models/index');

const editOrder=async(req,res)=>{
    try{
        const order_id=req.params.order_id;
        const order=await Orders.findOne({where:{order_id:order_id}});
        if(!order){
            return res.status(404).json({msg:'Order Not Found'});
        }
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
        orderItems.forEach(async(item)=>{
            const sub_total=await Products.findOne({where:{product_id:item.product_id}}).then((product)=>product.price*item.quantity);
            await OrderItems.update({
                product_id: item.product_id,
                seller_id: item.seller_id,
                quantity: item.quantity,
                sub_total: sub_total,
            }, {where:{order_item_id:item.order_item_id}});
            amount+=sub_total;
        });

        await Orders.update({total_amount:amount},{where:{order_id:order_id}});

        return res.status(200).json({msg:'Order Updated Successfully'});
    }catch(error){
        return res.status(500).json({msg:'Internal Server Error'});
    }
}

module.exports=editOrder;