'use strict';

module.exports = (sequelize, DataTypes) => {
  const Weet = sequelize.define(
    'Weet',
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_id',
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false,
      tableName: 'weets'
    }
  );
  Weet.associate = models => {
    Weet.belongsTo(models.User, {
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    });
  };
  return Weet;
};
