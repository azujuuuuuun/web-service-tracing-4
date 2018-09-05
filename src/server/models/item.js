'use strict'; // eslint-disable-line
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    body: {
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
  }, {});
  Item.associate = function(models) { // eslint-disable-line
    // associations can be defined here
    Item.User = Item.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    Item.Likers = Item.belongsToMany(models.User, {
      as: 'likers',
      through: {
        model: models.Like,
      },
      foreignKey: 'itemId',
      otherKey: 'userId',
    });
    Item.Comments = Item.hasMany(models.Comment, {
      foreignKey: 'itemId',
      as: 'comments',
    });
  };
  return Item;
};
