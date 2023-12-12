import { Sequelize, Op } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Item = db.define('item', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    description: {
        type: DataTypes.STRING,
    },
}, {
    freezeTableName: true
});

export default Item;
