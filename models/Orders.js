const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Orders = sequelize.define('Orders', {

    order_id: {
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
        allowNull: false,
        defaultValue: 0,
    },
    address_id: { //Foreign Key
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    payment_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    transaction_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'orders'
});

module.exports = Orders;