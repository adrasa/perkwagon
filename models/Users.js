const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Users = sequelize.define('Users', {
   auth_id: { //Foreign key
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Perkwagoner',
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    membership_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    profile_picture: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    total_orders: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    total_return: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    total_expenses: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
    },

}, {
    tableName: 'users'
});

module.exports = Users;