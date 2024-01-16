import { Sequelize } from "sequelize";

const db = new Sequelize('shifty','root','',{
    host: "localhost",
    dialect: "mysql"
});

export default db;