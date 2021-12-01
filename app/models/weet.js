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
        type: DataTypes.INTEGER
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      timestamps: true,
      tableName: 'weets',
      underscored: true
    }
  );
  Weet.associate = models => {
    Weet.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    });
    Weet.hasMany(models.Rating, {
      foreignKey: 'userId',
      as: 'rating'
    });
  };
  return Weet;
};
