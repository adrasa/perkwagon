const {Reviews}=require('../../models/index');
const removeFile=require('../../reusable_module/removeFile')
const deleteReviews=async(req, res)=>{
    try {
        
        const review_id=req.params.review_id;
        const review=await Reviews.findOne({where:{review_id}});
        if(!review) return res.status(404).json({error:"review not found"});
        if(review.video) await removeFile(review.video);
        review.images.forEach(async (image)=>await removeFile(image));
        await Reviews.destroy({where:{review_id}});
        return res.status(200).json({msg:"Review deleted successfully"});
    } catch (error) {
        return res.status(500).json({error:"Internal Server Error"});
    }
};
module.exports=deleteReviews;