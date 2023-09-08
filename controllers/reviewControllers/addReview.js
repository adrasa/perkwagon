const {Reviews, Products}=require('../../models/index');
const uploadFile=require('../../reusable_module/uploadFile');
const path=require('path');
const addReview=async(req,res)=>{
    try{
        const {product_id,rating,review}=req.body;
        const files=req.files;
        let videoUrl=null;
        let imageUrls=[];
        files.forEach(async(file)=>{
            const fileUrl=await uploadFile(file.buffer,file.originalname);
            if(path.extname(file.originalname)==='.mp4'){
                videoUrl=fileUrl;
            }
            if(path.extname(file.originalname)==='.jpg'||path.extname(file.originalname)==='.png'){
                imageUrls.push(fileUrl);
            }
        });
        const auth_id=req.user.auth_id;
        const reviewObj={
            product_id:product_id,
            auth_id:auth_id,
            rating:rating,
            review:review,
            images:{imageUrls},
            video:videoUrl,
        };

        const newReview=await Reviews.create(reviewObj);

        const product=await Products.findOne({where:{product_id}});
        const total_rating=product.total_rating+rating;
        const total_reviews=product.total_reviews+1;
        const product_rating=total_rating/total_reviews;
        await Products.update({total_rating,total_reviews,product_rating},{where:{product_id}});
        
        return res.status(200).json({msg:"Review added successfully"});
    }catch(err){
        return res.status(500).json({msg:"Internal Server Error"});
    }
};

module.exports=addReview;