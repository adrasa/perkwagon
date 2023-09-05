const {OrderItems}=require('../../models/index');
const editTrackingId=async(req,res)=>{
    try{
        const order_item_id=req.params.order_item_id;
        const orderItem=await OrderItems.findOne({where:{order_item_id:order_item_id}});
        if(!orderItem){
            return res.status(404).json({msg:'Order Item Not Found'});
        }
        await OrderItems.update({tracking_id:req.body.tracking_id},{where:{order_item_id:order_item_id}});
        return res.status(200).json({msg:'Tracking Id Updated Successfully'});
    }catch(error){
        return res.status(500).json({msg:'Internal Server Error'});
    }
}
module.exports=editTrackingId;