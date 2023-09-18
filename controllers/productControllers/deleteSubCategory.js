const {SubCategories, Products}=require('../../models/index');
const removeImage=require('../../reusable_module/removeFile');
const deleteSubCategory=async(req,res)=>{
    try{
        const product=await Products.findAll({where:{subcategory_id:req.params.subcategory_id}});
        if(product.length>0){
            return res.status(400).json({msg:'Delete Product First'});
        }else{
            const subcategory=await SubCategories.findOne({where:{subcategory_id:req.params.subcategory_id}});
            await removeImage(subcategory.subcategory_image);
            await SubCategories.destroy({where:{subcategory_id:req.params.subcategory_id}});
            return res.status(200).json({msg:'Sub Category Deleted Successfully'});
        }
    }catch(error){
        return res.status(500).json({msg:'Internal Server Error'});
    }
}
module.exports=deleteSubCategory;