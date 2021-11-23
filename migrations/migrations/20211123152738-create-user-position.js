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
        values: USER_POSITIONS,
        defaultValue: USER_POSITIONS[0]
      }
    );

    await queryInterface.addColumn('users', 'score', { type: Sequelize.INTEGER, defaultValue: 0 });
  },
  down: async queryInterface => {
    queryInterface.removeColumn('users', 'position');
    queryInterface.removeColumn('users', 'score');
  }
}
