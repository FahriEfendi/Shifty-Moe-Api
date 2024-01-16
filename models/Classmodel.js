import { Sequelize } from "sequelize";
import db from "../config/Database.js";


const {DataTypes} = Sequelize;

const Class = db.define('class',{
   
    name:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},{
    freezeTableName: true
});



export default Class;