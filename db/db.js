const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const knexConfig = require('../knexfile');
const knex = require("knex");
const nodeEnv = process.env.NODE_ENV || 'development';
const config = knexConfig[nodeEnv]; 

const db = knex(config);

console.log("DB Config:", {
  host: process.env.DB_HOST,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
});

module.exports = db;