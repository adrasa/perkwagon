const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const CartItems = sequelize.define('CartItems', {
    cart_item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    auth_id: { //Forien key
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: { //Forien Key
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'cartitems'
});

module.exports = CartItems;