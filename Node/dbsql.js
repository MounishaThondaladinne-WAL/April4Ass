const Sequelize = require("sequelize");

const db = new Sequelize("westsidenode", "user", "westside123", {
  host: "localhost",
  dialect: "mysql",
});
module.exports = db;
