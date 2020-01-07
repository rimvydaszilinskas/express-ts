'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      firstName: {
        type: Sequelize.STRING(128),
        allowNull: true
      },
      lastName: {
        type: Sequelize.STRING(128),
        allowNull: true
      },
      username: {
        type: Sequelize.STRING(128),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
