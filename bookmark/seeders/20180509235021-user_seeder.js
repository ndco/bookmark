'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', 
      [{
        email: 'ndco1@gmail.com',
        password: 'test1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        email: 'abcd@gmail.com',
        password: 'wow123',
        createdAt: new Date(),
        updatedAt: new Date()
        },{
        email: 'test@gmail.com',
        password: 'hello',
        createdAt: new Date(),
        updatedAt: new Date()
        },{
        email: 'last@gmail.com',
        password: 'first',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};
