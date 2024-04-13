require("dotenv").config();
const { app } = require("./app");
const { sequelize } = require("./database/database");
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log("server run on port " + PORT);
  sequelize.sync({ alter: true });
});
