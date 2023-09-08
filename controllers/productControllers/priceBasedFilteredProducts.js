const {Products, ProductSpecifications}=require('../../models/index');
const {Op}=require('sequelize');
const priceBasedFilteredProducts=async(req,res)=>{
    try{
        const {minPrice,maxPrice}=req.query;
        const productIds=await ProductSpecifications.findAll({
            where:{
                price:{
                    [Op.between]:[minPrice,maxPrice]
                }
            },
            attributes:['product_id'],
            
        });

        const products=await Products.findAll({
            where:{
                product_id:{
                    [Op.in]:productIds.map((product)=> {return product.product_id})
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
module.exports = priceBasedFilteredProducts;