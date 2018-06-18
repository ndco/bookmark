'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("bookmarks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isBookmarked: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      product_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        reference: {
          model: "products",
          key: "id"
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        reference: {
          model: "users",
          key: "id"
        }
      },
      origin_price: {
        type: Sequelize.DECIMAL(10, 2)
      },
      updated_price: {
        type: Sequelize.DECIMAL(10, 2)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('bookmarks');
  }
};