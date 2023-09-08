const {Reviews}=require('../../models/index');
const allReviewsFroSpecifiedProduct=async(req,res)=>{
    try{
        const product_id=req.params.product_id;
        const page = parseInt(req.query.page) || 1; // Get the requested page, default to 1
        const pageSize = parseInt(req.query.pageSize) || 10; // Set the number of items per page, default to 10

        const offset = (page - 1) * pageSize; // Calculate the offset based on the requested page
        const limit = pageSize;
        const reviews=await Reviews.findAll({
            where:{product_id},
            offset,
            limit,
            order: [['createdAt', 'DESC']],
        });
        if(!reviews){
            return res.status(404).json({msg:"No reviews found"});
        }
        return res.status(200).json({reviews});
    }catch(err){
        return res.status(500).json({msg:"Internal Server Error"});
    }
};
module.exports = allReviewsFroSpecifiedProduct;