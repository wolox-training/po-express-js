'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(
      'users',
      'role',
      {
        allowNull: false,
        type: Sequelize.ENUM('ADMIN', 'REGULAR'),
        defaultValue: 'REGULAR'
      }),

  down: queryInterface => queryInterface.removeColumn('users', 'role')
};
