const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST || "127.0.0.1",
      port: process.env.DB_PORT || 5432,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
    migrations: {
      directory: path.resolve(__dirname, "db/migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "db/seeds"),
    },
  },

  ci: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST || "postgres",
      port: process.env.DB_PORT || 5432,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};

module.exports = config[process.env.NODE_ENV || "development"];