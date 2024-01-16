import Char_models from "../models/Charactermodel.js";
import Class from "../models/Classmodel.js";
import Code from "../models/Codemodel.js";
import Company from "../models/Companymodel.js";
import Squad from "../models/Squadmodel.js";
import Cube from "../models/Cubemodel.js";
import Weapon from "../models/Weaponmodel.js";



export const getAllChar = async (req, res) => {
    try {
        let response;
         response = await Char_models.findAll({
                attributes: ['name', 'class','code','weapon', 'company','squad','burst','cube','normal_attack','skill_1','skill_2','burst_skill','createdAt','charimg'],
            });
     
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getCharId = async (req, res) => {
    try {
        const response = await Char_models.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id','name','class','code','weapon','company','squad','burst','cube','normal_attack','skill_1','skill_2','burst_skill','charImg'
            ],
            include: [{
                model: Class,
                attributes: ['name'],
                as: 'dataClass'
            }, {
                model: Code,
                attributes: ['name'],
                as: 'dataCode'
            },{
                model: Company,
                attributes: ['name'],
                as: 'dataCompany'
            },{
                model: Squad,
                attributes: ['name'],
                as: 'dataSquad'
            },{
                model: Cube,
                attributes: ['name'],
                as: 'dataCube'
            },{
                model: Weapon,
                attributes: ['name'],
                as: 'dataWeapon'
            }
        ],
        });

        if (!response) {
            return res.status(404).json({ msg: "Data Char tidak ditemukan" });
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createChar = async (req, res) => {
    const { name, characterClass ,code, weapon, company, squad,burst,cube,normal_attack,skill_1,skill_2,burst_skill } = req.body;
    try {
        await Char_models.create({
            name: name,
            class: characterClass,
            code: code,
            weapon: weapon,
            company: company,
            squad: squad,
            burst:burst,
            cube:cube,
            normal_attack:normal_attack,
            skill_1:skill_1,
            skill_2:skill_2,
            burst_skill:burst_skill

        });
        res.status(201).json({ msg: "Char Ditambahkan" });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msg: error.message });
    }
}

export const updateChar = async (req, res) => {
    try {
        const char = await Char_models.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!char) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const { name, characterClass ,code, weapon, company, squad,burst,cube,normal_attack,skill_1,skill_2,burst_skill } = req.body;
            await Char_models.update({ name, characterClass ,code, weapon, company, squad,burst,cube,normal_attack,skill_1,skill_2,burst_skill }, {
                where: {
                    id: char.id
                },
            });
        res.status(200).json({ msg: "Update Char berhasil diubah" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteChar = async (req, res) => {
    try {
        const char = await Char_models.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!char) return res.status(404).json({ msg: "Data tidak ditemukan" });
        if (req.role === 2) {
            await Char_models.destroy({
                where: {
                    id: char.id
                }
            });
        } else {
            if (req.role == 2) return res.status(403).json({ msg: "Akses terlarang" });
            await Char_models.destroy({
                where: {
                  id: char.id 
                }
            });
        }
        res.status(200).json({ msg: "Char berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

  

















