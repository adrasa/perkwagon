const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const OrderItems = sequelize.define('OrderItems', {
    order_item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    order_id: { //Foreign key
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: { //Foreign key
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    seller_id: { //Foreign key
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
    order_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending',
    },
   
    tracking_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },    
    invoice: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'orderitems'
});

module.exports = OrderItems;

