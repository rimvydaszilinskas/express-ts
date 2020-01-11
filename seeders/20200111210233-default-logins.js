'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    var password = bcrypt.hashSync('password', bcrypt.genSaltSync(10));

    return queryInterface.bulkInsert('users', [{
      firstName: 'John',
      lastName: 'Doe',
      username: 'admin',
      password: password,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', [{
      firstName: 'John',
      lastName: 'Doe',
      username: 'admin'
    }]);
  }
};
