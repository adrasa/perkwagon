const {Addresses}=require('../../models/index');
const addAddresses=async(req,res)=>{
    try{
        if (req.body.is_default) {
            await Addresses.update({ is_default: false }, 
                { where: 
                    { 
                        auth_id: req.user.auth_id ,
                        is_default:true,
                    }
                }
            );
        }
        const addresses=await Addresses.create({
            auth_id:req.user.auth_id,
            address_line_1:req.body.address_line_1,
            address_line_2:req.body.address_line_2,
            city:req.body.city,
            state:req.body.state,
            pincode:req.body.pincode,
            landmark:req.body.landmark,
            is_default:req.body.is_default
        });
        
        return res.status(200).json({msg:'Address added successfully'});
    }catch(err){
        return res.status(500).json({msg:'Internal Server Error'});
    }
}
module.exports=addAddresses;