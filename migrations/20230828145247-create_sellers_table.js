'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sellers', {
      seller_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      auth_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      seller_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      business_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      goverment_issued_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gstin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      business_phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      business_whatapp_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      business_email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      business_address_information: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      website: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      delivery_partner_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_products_listed: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      total_order_received: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      total_order_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      total_order_cancelled: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      total_products_returned: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      total_returned_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      business_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,

      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sellers');
  },
};
