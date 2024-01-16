import { Sequelize } from "sequelize";
import db from "../config/Database.js";


const {DataTypes} = Sequelize;

const Company = db.define('company',{
   
    name:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},{
    freezeTableName: true
});



export default Company;