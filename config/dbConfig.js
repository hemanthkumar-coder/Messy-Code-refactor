const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./DB/database.db",
  logging: console.log,
});

async function connectToDb() {
  try {
    await sequelize.authenticate();
    console.log("connection Successfull");
    await sequelize.sync();
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = { connectToDb, sequelize };
