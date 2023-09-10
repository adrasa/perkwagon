const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');
const Sellers = sequelize.define('Sellers', {
    seller_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    admin_id: { //Foreign key
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    seller_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    business_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    goverment_issued_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gstin: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    business_phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    business_whatsapp_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    business_email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    business_address_line_1: { //adrees line 1, address line 2, city, state, pincode, country
        type: DataTypes.STRING,
        allowNull: false,
    },
    business_address_line_2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    business_address_city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    business_address_state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    business_address_pincode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    business_address_landmark: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true,
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
    total_products_listed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    total_order_recieved: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    total_order_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    total_order_cancelled: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    total_products_returned: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    total_returned_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    business_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
    },
}, {
    tableName: 'sellers'
});

module.exports = Sellers;
