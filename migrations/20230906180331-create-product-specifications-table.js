'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('productspecifications', {
      specification_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'product_id',
        },
        onDelete: 'CASCADE',
      },
      size: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      discount_for_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price_for_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      discount_for_member: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price_for_member: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      weight: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      height: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      width: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      breadth: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      depth: {
        type: Sequelize.DECIMAL(10, 2),
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
    await queryInterface.dropTable('productspecifications');
  },
};
