'use strict'; // eslint-disable-line
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
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
    itemId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {});
  Like.associate = function(models) { // eslint-disable-line
    // associations can be defined here
  };
  return Like;
};
