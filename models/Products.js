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
    product_rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    total_rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    total_reviews: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
        references: {
            model: 'subcategories',
            key: 'subcategory_id',
        },
        onDelete: 'CASCADE',
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
    manufacturer_name: { //Manufacturer name, Contact number, Email, customer supprot number
        type: DataTypes.STRING,
        allowNull: false,
    },
    manufacturer_contact_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    manufacturer_email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    customer_support_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    used_material: {
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