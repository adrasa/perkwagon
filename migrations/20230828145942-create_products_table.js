'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      images: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tags: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      product_rating: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      total_rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      total_reviews: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      min_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      max_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      subcategory_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      warranty_information: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      refundable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      return_period: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      return_policy: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      safety_information: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      manufacturer_information: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      payment_method: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      seller_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sell_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      is_featured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    await queryInterface.dropTable('products');
  },
};
