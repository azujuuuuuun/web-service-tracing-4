'use strict'; // eslint-disable-line
module.exports = (sequelize, DataTypes) => {
  const UserTag = sequelize.define('UserTag', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    tagId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {});
  UserTag.associate = function(models) { // eslint-disable-line
    // associations can be defined here
  };
  return UserTag;
};
