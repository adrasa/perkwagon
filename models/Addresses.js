const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Addresses = sequelize.define('Addresses', {
    address_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    auth_id: { //Foreign key
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    address_line_1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address_line_2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pincode: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    landmark: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_default: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },

}, {
    tableName: 'addresses'
});
module.exports = Addresses;