'use strict';
const { USER_POSITIONS } = require("../../app/constants/params");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'users',
      'position',
      {
        allowNull: false,
        type: Sequelize.ENUM,
        values: Object.values(USER_POSITIONS),
        defaultValue: USER_POSITIONS.DEVELOPER
      }
    );

    await queryInterface.addColumn('users', 'score', { type: Sequelize.INTEGER, defaultValue: 0 });
  },
  down: async queryInterface => {
    await queryInterface.removeColumn('users', 'position');
    await queryInterface.removeColumn('users', 'score');
  }
}
