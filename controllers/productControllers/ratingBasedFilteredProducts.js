const {Products, ProductSpecifications}=require('../../models/index');
const {Op}=require('sequelize');
const ratingBasedFilteredProducts=async(req,res)=>{
    try{
        const {ratings}=req.query; //getarray of ratings
        const products=await Products.findAll({
            where:{
                product_rating:{
                    [Op.in]:ratings,
                }
            },
            include:{
                model:ProductSpecifications,
            }
        });
        if(!products){
            return res.status(404).json({msg:"No products found"});
        }
        return res.status(200).json({products});
    }catch(err){
        return res.status(500).json({msg:"Internal Server Error"});
    }
};
module.exports = ratingBasedFilteredProducts;