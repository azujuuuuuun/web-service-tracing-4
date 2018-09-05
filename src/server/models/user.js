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
    User.Likes = User.belongsToMany(models.Item, {
      as: 'likes',
      through: {
        model: models.Like,
      },
      foreignKey: 'userId',
      otherKey: 'itemId',
    });
    User.Stocks = User.belongsToMany(models.Item, {
      as: 'stocks',
      through: {
        model: models.Stock,
      },
      foreignKey: 'userId',
      otherKey: 'itemId',
    });
    User.Comments = User.hasMany(models.Comment, {
      foreignKey: 'userId',
      as: 'comments',
    });
    User.Followings = User.belongsToMany(models.User, {
      as: 'followings',
      through: {
        model: models.Relationship,
      },
      foreignKey: 'followerId',
      otherKey: 'followedId',
    });
    User.Followers = User.belongsToMany(models.User, {
      as: 'followers',
      through: {
        model: models.Relationship,
      },
      foreignKey: 'followedId',
      otherKey: 'followerId',
    });
  };
  return User;
};
