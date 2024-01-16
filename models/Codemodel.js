import { Sequelize } from "sequelize";
import db from "../config/Database.js";


const {DataTypes} = Sequelize;

const Code = db.define('code',{
   
    name:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},{
    freezeTableName: true
});



export default Code;