import { Sequelize } from "sequelize";
import db from "../config/Database.js";


const {DataTypes} = Sequelize;

const Cube = db.define('cubes',{
   
    name:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},{
    freezeTableName: true
});



export default Cube;