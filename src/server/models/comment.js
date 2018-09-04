'use strict'; // eslint-disable-line
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    text: {
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
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    itemId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {});
  Comment.associate = function(models) { // eslint-disable-line
    // associations can be defined here
    Comment.User = Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    Comment.Item = Comment.belongsTo(models.Item, {
      foreignKey: 'itemId',
      as: 'item',
    });
  };
  return Comment;
};
