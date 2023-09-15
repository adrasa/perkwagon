const {SubCategories}=require('../../models/index');
const {removeFile}=require('../../reusable_module/removeFile');
const deleteSubCategory=async(req,res)=>{
    try{
        const subcategory_id=req.params.subcategory_id;
        const subcategory=await SubCategories.findOne({where:{subcategory_id}});
        if(!subcategory) return res.status(400).json({msg:"No subcategory found"});
        removeFile(subcategory.subcategory_image);
        await SubCategories.destroy({where:{subcategory_id}});
        return res.status(200).json({msg:'SubCategory deleted successfully'});
    }catch(err){
        return res.status(500).json({msg:err.message});
    }
}
module.exports=deleteSubCategory;