'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('weets', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING
      },
    }),
  down: queryInterface => queryInterface.dropTable('weets')
};
