'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('weets', 'created_at', { type: Sequelize.DATE })
    await queryInterface.addColumn('weets', 'updated_at', { type: Sequelize.DATE })
  },
  down: async queryInterface => {
    await queryInterface.removeColumn('weets', 'created_at')
    await queryInterface.removeColumn('weets', 'updated_at')
  }
}
