import express from "express";
import {
    getAllChar,
    createChar,
    getCharId,
    updateChar,
    deleteChar
} from "../controllers/Character.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

/* router.get('/users', verifyUser, adminOnly, getUsers);
router.get('/users/:id', verifyUser, adminOnly, getUserById);
router.patch('/users/:id', verifyUser, adminOnly, updateUser);
router.delete('/users/:id', verifyUser, adminOnly, deleteUser); */

router.get('/character', getAllChar);
router.post('/character', adminOnly,createChar);
router.get('/character/:id', getCharId);
router.patch('/character/:id', adminOnly,updateChar);
router.delete('/character/:id', adminOnly, deleteChar);

export default router;