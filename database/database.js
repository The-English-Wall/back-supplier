const { Sequelize, DataTypes, Op } = require("sequelize");

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;
console.log(
  "Database varibales: ",
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT
);

const sequelize = new Sequelize({
  database: DB_NAME,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    logging: false,
    native: false,
  },
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

sequelize
  .authenticate()
  .then(() => console.log("Postgres database connected"))
  .catch((error) => console.log("Something goes wrong " + error.message));

module.exports = { sequelize, DataTypes, Op };
