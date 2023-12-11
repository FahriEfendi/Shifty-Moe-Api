import { Sequelize, Op } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Char = db.define('character', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    class: {
        type: DataTypes.INTEGER,
    },
    code: {
        type: DataTypes.INTEGER,
    },
    weapon: {
        type: DataTypes.INTEGER,
    },
    company: {
        type: DataTypes.INTEGER,
    },
    squad: {
        type: DataTypes.STRING,
    },
}, {
    freezeTableName: true
});

export default Char;
