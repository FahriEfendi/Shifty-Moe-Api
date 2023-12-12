import Item_models from "../models/Itemmodel.js";


export const getAllitem = async (req, res) => {
    try {
        let response;
         response = await Item_models.findAll({
                attributes: ['name', 'description'],
            });
     
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getItemId = async (req, res) => {
    try {
        const item = await Item_models.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!item) {
            return res.status(404).json({ msg: "Data Item tidak ditemukan" });
        }

        const response = await Item_models.findOne({
            attributes: ['name', 'description'],
            where: {
                id: item.id
            },
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createItem = async (req, res) => {
    const { name, description } = req.body;
    try {
        await Item_models.create({
            name: name,
            description: description

        });
        res.status(201).json({ msg: "Item Ditambahkan" });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msg: error.message });
    }
}

export const updateItem = async (req, res) => {
    try {
        const item = await Item_models.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!item) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const { name, description  } = req.body;
            await Item_models.update({ name, description }, {
                where: {
                    id: item.id
                },
            });
        res.status(200).json({ msg: "Update Item berhasil diubah" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteItem = async (req, res) => {
    try {
        const item = await Item_models.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!item) return res.status(404).json({ msg: "Data tidak ditemukan" });
        if (req.role === 2) {
            await Item_models.destroy({
                where: {
                    id: item.id
                }
            });
        } else {
            if (req.role == 2) return res.status(403).json({ msg: "Akses terlarang" });
            await Item_models.destroy({
                where: {
                  id: item.id 
                }
            });
        }
        res.status(200).json({ msg: "Item berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

  

















