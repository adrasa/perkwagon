const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Products = sequelize.define('Products', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    images: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tags:{
        type: DataTypes.JSON,
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
    discount_for_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price_for_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    discount_for_member: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price_for_member: {
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
    subcategory_id: { //foreign key
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
    sell_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    is_featured: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },

}, {
    tableName: 'products'
});

module.exports = Products;