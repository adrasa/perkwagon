const {Orders}=require('../../models/index');
const deleteOrder=async(req,res)=>{
    try{
        const order_id=req.params.order_id;
        const order=await Orders.findOne({where:{order_id:order_id}});
        if(!order){
            return res.status(404).json({msg:'Order Not Found'});
        }
        await order.destroy();
        return res.status(200).json({msg:'Order Deleted Successfully'});
    }catch(error){
        return res.status(500).json({msg:'Internal Server Error'});
    }
}

module.exports=deleteOrder;