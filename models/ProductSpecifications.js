const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const ProductSpecifications = sequelize.define('ProductSpecifications', {
    specification_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_id: { // Foreign key referencing the Product table
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'product_id',
        },
        onDelete: 'CASCADE',

    },
    size: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
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
    weight: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    height: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    width: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    breadth: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    depth: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    tableName: 'productspecifications'
});

module.exports = ProductSpecifications;