'use strict';

const { USER_POSITIONS } = require('../constants/params');
const { getPositionByScore } = require('../helpers/get-user-position');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      lastName: {
        allowNull: false,
        field: 'last_name',
        type: DataTypes.STRING
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Must be a valid email'
          }
        }
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      role: {
        allowNull: false,
        type: DataTypes.ENUM('ADMIN', 'REGULAR'),
        defaultValue: 'REGULAR'
      },
      position: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: Object.values(USER_POSITIONS),
        defaultValue: USER_POSITIONS.DEVELOPER
      },
      score: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      sessionExpires: {
        type: DataTypes.DATE
      }
    },
    {
      timestamps: false,
      tableName: 'users',
      underscored: true
    }
  );

  User.beforeUpdate(user => {
    user.position = getPositionByScore(user.score)
  });

  User.associate = models => {
    User.hasMany(models.Weet, {
      foreignKey: 'userId',
      as: 'weets'
    });
  }
  return User;
};
