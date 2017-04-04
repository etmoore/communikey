const path = require('path');

const directories = {
  seed: path.join(__dirname, 'db', 'seeds'),
  migration: path.join(__dirname, 'db', 'migrations'),
};

const pgBase = 'postgres://localhost:5432/';

module.exports = {

  development: {
    client: 'pg',
    connection: `${pgBase}communikey_dev`,
    migrations: {
      directory: directories.migration,
    },
    seeds: {
      directory: directories.seed,
    },
  },

  test: {
    client: 'pg',
    connection: `${pgBase}communikey_test`,
    migrations: {
      directory: directories.migration,
    },
    seeds: {
      directory: directories.seed,
    },
  },
};
