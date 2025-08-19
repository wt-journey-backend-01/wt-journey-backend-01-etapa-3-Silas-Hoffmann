const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
});

console.log("DB Config:", {
  host: process.env.DB_HOST,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
});

module.exports = db;