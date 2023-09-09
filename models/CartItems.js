const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const CartItems = sequelize.define('CartItems', {
    cart_item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cart_id: { //Foreign key
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: { //Foreign key
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sub_total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },  
}, {
    tableName: 'cartitems'
});

module.exports = CartItems;

