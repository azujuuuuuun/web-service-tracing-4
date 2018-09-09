'use strict'; // eslint-disable-line

module.exports = {
  up: (queryInterface, Sequelize) => { // eslint-disable-line
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const now = new Date();
    return queryInterface.bulkInsert('Users', [{
      username: 'a',
      email: 'a@example.com',
      password: 'ypeBEsobvcr6wjGzmiPcTaeG7/gUfE5yuYB3ha/uSLs=',
      createdAt: now,
      updatedAt: now,
    }, {
      username: 'b',
      email: 'b@example.com',
      password: 'PiPoFgA5WUoziU9lZOGxNIu9egCI1CxKy3PurtWcAJ0=',
      createdAt: now,
      updatedAt: now,
    }], {});
  },

  down: (queryInterface, Sequelize) => { // eslint-disable-line
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  },
};
