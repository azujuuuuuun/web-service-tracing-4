'use strict'; // eslint-disable-line
module.exports = (sequelize, DataTypes) => {
  const ItemTag = sequelize.define('ItemTag', {
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
    itemId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    tagId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {});
  ItemTag.associate = function(models) { // eslint-disable-line
    // associations can be defined here
  };
  return ItemTag;
};
