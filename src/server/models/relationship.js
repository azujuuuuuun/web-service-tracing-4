'use strict'; // eslint-disable-line
module.exports = (sequelize, DataTypes) => {
  const Relationship = sequelize.define('Relationship', {
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
    followerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    followedId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {});
  Relationship.associate = function(models) { // eslint-disable-line
    // associations can be defined here
  };
  return Relationship;
};
