const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Products = sequelize.define('Products', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_images: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    min_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    max_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    //make a image table max images per product
    category_id: { //foreign key
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
    warranty_information: { //warranty period, garranty, warranty policy
        type: DataTypes.JSON,
        allowNull: false,
    },
    refundable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    return_period: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    return_policy: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    safety_information: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    manufacturer_information: { //Manufacturer name, Contact number, Email, customer supprot number
        type: DataTypes.JSON,
        allowNull: false,
    },
    payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    seller_id: { //foreign key
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'products'
});

module.exports = Products;