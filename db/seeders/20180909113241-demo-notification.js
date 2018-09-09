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
    const notificationKinds = [
      'newsMail',
      'stockListMail',
      'editRequestMail',
      'editRequestWeb',
      'commentMail',
      'commentWeb',
      'mentionMail',
      'mentionWeb',
      'linkWeb',
      'likeWeb',
      'stockWeb',
      'followMail',
      'followWeb',
      'twitterWeb',
    ];
    const now = new Date();
    const records = notificationKinds.map(k => ({
      kind: k,
      createdAt: now,
      updatedAt: now,
      userId: 1,
    }));
    return queryInterface.bulkInsert('Notifications', records, {});
  },

  down: (queryInterface, Sequelize) => { // eslint-disable-line
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Notifications', null, {});
  },
};
