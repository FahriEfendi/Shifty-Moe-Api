import { Sequelize, Op } from "sequelize";
import db from "../config/Database.js";
import Class from "./Classmodel.js";
import Code from "./Codemodel.js"
import Company from "./Companymodel.js"
import Squad from "./Squadmodel.js";
import Cube from "./Cubemodel.js";
import Weapon from "./Weaponmodel.js";
import Rarity from "./Raritymodel.js";

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
    charclass: {
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
        type: DataTypes.INTEGER,
    },
    burst: {
        type: DataTypes.INTEGER,
    },
    cube: {
        type: DataTypes.INTEGER,
    },
    rarity: {
        type: DataTypes.INTEGER,
    },
    normal_attack: {
        type: DataTypes.STRING,
    },
    skill_1: {
        type: DataTypes.STRING,
    },
    skill_2: {
        type: DataTypes.STRING,
    },
    burst_skill: {
        type: DataTypes.STRING,
    },
    charimg: {
        type: DataTypes.STRING,
    },
    slug: {
        type: DataTypes.STRING,
    },
}, {
    freezeTableName: true
});

Class.hasMany(Char, { foreignKey: 'charclass', as: 'dataClass' });
Char.belongsTo(Class, { foreignKey: 'charclass', as: 'dataClass' });

Code.hasMany(Char, { foreignKey: 'code', as: 'dataCode' });
Char.belongsTo(Code, { foreignKey: 'code', as: 'dataCode' });

Company.hasMany(Char, { foreignKey: 'company', as: 'dataCompany' });
Char.belongsTo(Company, { foreignKey: 'company', as: 'dataCompany' });

Squad.hasMany(Char, { foreignKey: 'squad', as: 'dataSquad' });
Char.belongsTo(Squad, { foreignKey: 'squad', as: 'dataSquad' });

Cube.hasMany(Char, { foreignKey: 'cube', as: 'dataCube' });
Char.belongsTo(Cube, { foreignKey: 'cube', as: 'dataCube' });

Weapon.hasMany(Char, { foreignKey: 'weapon', as: 'dataWeapon' });
Char.belongsTo(Weapon, { foreignKey: 'weapon', as: 'dataWeapon' });

Rarity.hasMany(Char, { foreignKey: 'rarity', as: 'dataRarity' });
Char.belongsTo(Rarity, { foreignKey: 'rarity', as: 'dataRarity' });

export default Char;
