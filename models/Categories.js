const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Categories = sequelize.define('Categories', {
    category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'categories'
});

module.exports= Categories;