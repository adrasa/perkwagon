const {DataTypes}=require('sequelize');
const sequelize=require('../db/connection');
const Reviews=sequelize.define('Reviews',{
    review_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    product_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    auth_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    rating:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    review:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    video:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    images:{
        type:DataTypes.JSON,
        allowNull:true,
    },
},{
    tableName:'reviews'
});
module.exports=Reviews;
