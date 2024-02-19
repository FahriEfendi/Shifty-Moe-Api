import express from "express";
import {
    getAllChar,
    getTotalchar,
    createChar,
    getCharId,
    updateChar,
    deleteChar
} from "../controllers/Character.js";
import { verifyUser, adminOnly, verifyToken, internalEndpointMiddleware } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/character', getAllChar);
router.get('/charactercount', getTotalchar);
router.post('/character', adminOnly,createChar);
router.get('/character/:id', getCharId);
router.patch('/character/:id', adminOnly,updateChar);
router.delete('/character/:id', adminOnly, deleteChar);

export default router;