import { Sequelize } from "sequelize";
import db from "../config/Database.js";


const {DataTypes} = Sequelize;

const Weapon = db.define('weapon',{
   
    name:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},{
    freezeTableName: true
});



export default Weapon;