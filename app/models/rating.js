'use strict';

module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    'Rating',
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
      weetId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      score: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    {
      timestamps: false,
      tableName: 'ratings',
      underscored: true
    }
  );
  Rating.associate = models => {
    Rating.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    });
    Rating.belongsTo(models.Weet, {
      as: 'weet',
      foreignKey: 'weetId'
    });
  };
  return Rating;
};
