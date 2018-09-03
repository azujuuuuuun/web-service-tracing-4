const sqlFormatter = require('sql-formatter');
const { highlight } = require('cli-highlight');

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    logging: (log) => {
      console.log(highlight(sqlFormatter.format(log), { // eslint-disable-line
        langage: 'sql',
        ignoreIllegals: true,
      }));
    },
  },
  test: {
    username: 'database_test',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'database_prod',
    password: 'database_prod',
    database: 'database_prod',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
