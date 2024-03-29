import express from "express";
import {
    getAllitem,
    getTotalItem,
    createItem,
    getItemId,
    updateItem,
    deleteItem
} from "../controllers/Item.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/item', getAllitem);
router.get('/itemcount', getTotalItem);
router.post('/item', adminOnly,createItem);
router.get('/item/:id', getItemId);
router.patch('/item/:id', adminOnly,updateItem);
router.delete('/item/:id', adminOnly, deleteItem);

export default router;