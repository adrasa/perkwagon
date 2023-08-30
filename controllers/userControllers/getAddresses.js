const {Addresses}=require('../../models/index');
const getAddresses=async(req,res)=>{
    try{
        const addresses=await Addresses.findAll({
            where:{auth_id:req.user.auth_id},
            attributes:['address_id','address_line_1','address_line_2','city','state','pincode','country','is_default']
        });
        return res.status(200).json({addresses});
    }catch(err){
        return res.status(500).json({msg:'Internal Server Error'});
    }
}
module.exports=getAddresses;