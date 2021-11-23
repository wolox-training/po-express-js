'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('ratings', {
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
      weet_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'weets',
          key: 'id'
        }
      },
      score: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    }),
  down: queryInterface => queryInterface.dropTable('ratings')
};
