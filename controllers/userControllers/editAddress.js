const {Addresses}=require('../../models/index')
const editAddress=async(req,res)=>{
    try{
        const address=await Addresses.findOne({
            where:{
                auth_id:req.user.auth_id,
                address_id:req.params.address_id
            }
        });
        if(!address){
            return res.status(404).json({msg:'Address not found'});
        }
        if(req.body.is_default){
            await Addresses.update({is_default:false},{
                where:{
                    auth_id:req.user.auth_id,
                    is_default:true
                }
            });
        }
        await Addresses.update({
            address_line_1:req.body.address_line_1,
            address_line_2:req.body.address_line_2,
            city:req.body.city,
            state:req.body.state,
            pincode:req.body.pincode,
            country:req.body.country,
            is_default:req.body.is_default
        },{
            where:{
                address_id:req.params.address_id,
                auth_id:req.user.auth_id
            }
        });
        return res.status(200).json({msg:'Address updated successfully'});
    }catch(err){
        return res.status(500).json({msg:'Internal server error'});
    }
}
module.exports=editAddress;