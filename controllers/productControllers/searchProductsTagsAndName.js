const {Products, ProductSpecifications}=require('../../models/index');
const { Op } = require("sequelize");
const searchProductsTagsAndName=async(req,res)=>{
    try {
        const search=req.query.search;
        const page = parseInt(req.query.page) || 1; // Get the requested page, default to 1
        const pageSize = parseInt(req.query.pageSize) || 10; // Set the number of items per page, default to 10

        const offset = (page - 1) * pageSize; // Calculate the offset based on the requested page
        const limit = pageSize;

        const productCount = await Products.count({
            where:{
                product_name:{
                    [Op.like]: `%${search}%`
                }
            }
        });
        const products = await Products.findAll({
            include:{
                    model: ProductSpecifications,
            },
            offset,
            limit,
            order: [['createdAt', 'DESC']],
            where:{
                [Op.or]:[
                    {
                        product_name:{
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        tags:{
                            [Op.contains]: [`%${search}%`]
                        }
                    }
                ],
            }
        });
        if(!products || products.length===0) return res.status(400).json({ msg: 'No products found' });
        return res.status(200).json({ data:{products, productCount} });

    } catch (error) {
        return res.status(500).json({ msg: error.message});
    }
}

module.exports=searchProductsTagsAndName;