const {Products, ProductSpecifications}=require('../../models/index');
const filteredProducts=async(req,res)=>{
    try {
        const ratings=req.query.ratings;
        const minPrice=req.query.minPrice;
        const maxPrice=req.query.maxPrice;
        let products=await Products.findAll({
            include:{
                model:ProductSpecifications,
            }
        });
        if(ratings){
            //exdtarcting products with ratings
            products=products.filter((product)=>{
                return ratings.includes(product.product_rating);
            });
        }
        if(minPrice && maxPrice){
            //extracting products with price range
            products=products.filter((product)=>{
                return product.ProductSpecification.product_price>=minPrice && product.ProductSpecification.product_price<=maxPrice;
            });
        }
        
    } catch (error) {
        
    }
}
module.exports=filteredProducts;