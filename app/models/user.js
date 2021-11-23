'use strict';

const { USER_POSITIONS } = require("../constants/params");

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
        values: USER_POSITIONS,
        defaultValue: USER_POSITIONS[0]
      },
      score: {
        type: DataTypes.INTEGER, 
        defaultValue: 0
      }
    },
    {
      timestamps: false,
      tableName: 'users'
    }
  );
  User.associate = models => {
    User.hasMany(models.Weet, {
      foreignKey: 'userId',
      as: 'weets'
    });
  }
  return User;
};
