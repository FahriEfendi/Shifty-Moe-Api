import Char_models from "../models/Charactermodel.js";
import Users from "../models/Usermodel.js";
import { Op } from "sequelize";


export const getAllChar = async (req, res) => {
    try {
        let response;
         response = await Char_models.findAll({
                attributes: ['name', 'class','code','weapon', 'company','squad'],
            });
     
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getCharId = async (req, res) => {
    try {
        const char = await Char_models.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!char) {
            return res.status(404).json({ msg: "Data Char tidak ditemukan" });
        }

        const response = await Char_models.findOne({
            attributes: ['name', 'class','code','weapon', 'company','squad'],
            where: {
                id: char.id
            },
         /*    include: [{
                model: Users,
                attributes: ['nama', 'role', 'id', 'jur_id']
            },
            {
                model: sesi_if,
                attributes: ['sesi']
            },
            {
                model: Room,
                attributes: ['ruangan']
            }] */
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createChar = async (req, res) => {
    const { name, characterClass ,code, weapon, company, squad } = req.body;
    try {
        await Char_models.create({
            name: name,
            class: characterClass,
            code: code,
            weapon: weapon,
            company: company,
            squad: squad

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
        const { name, characterClass ,code, weapon, company, squad } = req.body;
            await Char_models.update({ name, characterClass ,code, weapon, company, squad }, {
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
        res.status(200).json({ msg: "Pengajuan berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

  

















