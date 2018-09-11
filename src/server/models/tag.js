'use strict'; // eslint-disable-line
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
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
  Tag.associate = function(models) { // eslint-disable-line
    // associations can be defined here
    Tag.Items = Tag.belongsToMany(models.Item, {
      as: 'items',
      through: {
        model: models.ItemTag,
      },
      foreignKey: 'tagId',
      otherKey: 'itemId',
    });
  };
  return Tag;
};
