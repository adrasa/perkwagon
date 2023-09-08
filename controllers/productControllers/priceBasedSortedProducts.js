const {Products, ProductSpecifications}=require('../../models/index');  
const {Op}=require('sequelize');
const priceBasedSortedProducts=async(req,res)=>{
    try {
        const {sort}=req.query; //take sort as 'DESC' or 'ASC'
        const productIds=await ProductSpecifications.findAll({
            attributes:['product_id'],
            order:[['price',sort]]
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
    } catch (error) {
        
    }
};
module.exports = priceBasedSortedProducts;