const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const DeliveryPartner = sequelize.define('DeliveryPartner', {
    delivery_partner_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    delivery_partner_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    shipping_charge: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    order_tracking_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    terms_and_conditions: {
        type: DataTypes.STRING,
        allowNull: false,   
    },
}, {
    tableName: 'deliverypartner'
});

module.exports = DeliveryPartner;