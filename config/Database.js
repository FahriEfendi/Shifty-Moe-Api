import { Sequelize } from "sequelize";

const db = new Sequelize('shifty','root','',{
    host: "188.256.0.7",
    dialect: "mysql"
});

export default db;