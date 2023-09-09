const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Admin = sequelize.define('Admin', {
    admin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    isRoot: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false       
    }
}, {
    tableName: 'admin'
});



module.exports = Admin;
