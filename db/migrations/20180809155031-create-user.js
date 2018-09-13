'use strict'; // eslint-disable-line
module.exports = {
  up: (queryInterface, Sequelize) => { // eslint-disable-line
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      web: {
        type: Sequelize.STRING,
      },
      organization: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      avatarImgSrc: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => { // eslint-disable-line
    return queryInterface.dropTable('Users', { force: true });
  },
};
