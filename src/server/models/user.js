'use strict'; // eslint-disable-line
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {});
  User.associate = models => { // eslint-disable-line
    // associations can be defined here
    User.Items = User.hasMany(models.Item, {
      foreignKey: 'userId',
      as: 'items',
    });
  };
  return User;
};
