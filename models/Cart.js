const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Cart = sequelize.define('Cart', {

    cart_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    auth_id: { //Foreign key
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    }
}, {
    tableName: 'cart'
});

module.exports = Cart;