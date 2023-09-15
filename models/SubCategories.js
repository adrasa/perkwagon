const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const SubCategories = sequelize.define('SubCategories', {
    subcategory_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    subcategory_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subcategory_image:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'category_id'
        },
        onDelete: 'CASCADE',
    }
    
}, {
    tableName: 'subcategories'
});

module.exports = SubCategories;